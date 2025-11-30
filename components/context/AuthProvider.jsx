"use client";
import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { Toaster, toast } from "sonner";

export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProcessingAuth, setIsProcessingAuth] = useState(true);
  const [menus, setMenus] = useState([]);
  const [isMenuLoading, setIsMenuLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const hasFetchedMenus = useRef(false); // Ref untuk melacak apakah menu sudah diambil

  const startProcessingAuth = () => setIsProcessingAuth(true);
  const stopProcessingAuth = () => setIsProcessingAuth(false);

  const logout = useCallback(
    async ({ showToast = true } = {}) => {
      startProcessingAuth();
      try {
        const token = localStorage.getItem("token");
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          await api.post("/auth/signout");
        }
      } catch (error) {
        console.error(
          "Server logout failed, logging out client-side anyway.",
          error
        );
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
        setIsAuthenticated(false);
        hasFetchedMenus.current = false; // Reset status fetch menu saat logout
        router.push("/login");
        stopProcessingAuth();
        if (showToast) {
          toast.success("Logout berhasil.");
        }
      }
    },
    [router]
  ); // eslint-disable-line react-hooks/exhaustive-deps

  const revalidateUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await api.get("/users/profile");
        const userData = response.data.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return userData; // Mengembalikan data pengguna yang baru
      }
    } catch (error) {
      console.error("Failed to revalidate user, logging out.", error);
      await logout({ showToast: false });
    }
    return null; // Mengindikasikan gagal
  }, [logout]);

  useEffect(() => {
    const verifyAuth = async () => {
      startProcessingAuth();
      const token = localStorage.getItem("token");
      if (token) {
        await revalidateUser();
      }
      stopProcessingAuth();
    };
    verifyAuth();
  }, []); // Hapus revalidateUser dari dependensi agar hanya berjalan sekali saat mount

  // Efek untuk mengambil menu pengguna hanya sekali setelah user terautentikasi
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setIsMenuLoading(true);
        const response = await api.get("/users/menus");
        setMenus(response.data.data || []);
        hasFetchedMenus.current = true; // Tandai bahwa menu sudah diambil
      } catch (error) {
        console.error("Failed to fetch user menus:", error);
      } finally {
        setIsMenuLoading(false);
      }
    };
    // Hanya fetch jika ada user dan menu belum pernah diambil
    if (user && !hasFetchedMenus.current) {
      fetchMenus();
    }
  }, [user]);

  const login = async (email, password) => {
    startProcessingAuth();
    try {
      const response = await api.post("/auth/signin", {
        user_email: email,
        user_password: password,
      });

      const { access_token: token, user: userData, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userData);
      setIsAuthenticated(true);
      toast.success(message || "Login berhasil!");
      router.push("/admin");
    } catch (error) {
      console.error("Login gagal", error);
      const errorMessage =
        error.response?.data?.message ||
        "Tidak dapat login. Silakan coba lagi.";
      toast.error(errorMessage);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      stopProcessingAuth();
    }
  };

  const contextValue = {
    user,
    isAuthenticated,
    isProcessingAuth,
    login,
    menus,
    isMenuLoading,
    logout,
    revalidateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};

export { AuthProvider };
