// This file centralizes the data for featured products, making it easier to manage.

export const getFeaturedProducts = (t) => [
  {
    id: "cloves",
    image: "/products/cloves.png",
    category: t("product1_category"),
    title: t("product1_title"),
    href: "/products/cloves",
  },
  {
    id: "coffee",
    image: "/products/coffe.png",
    category: t("product2_category"),
    title: t("product2_title"),
    href: "/products/coffee",
  },
  {
    id: "mangosteen",
    image: "/products/mangosteen.png",
    category: t("product3_category"),
    title: t("product3_title"),
    href: "/products/mangosteen",
  },
  {
    id: "coconut-oil",
    image: "/products/coconut-oil.png",
    category: t("product4_category"),
    title: t("product4_title"),
    href: "/products/coconut-oil",
  },
];
