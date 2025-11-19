import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/data/allProducts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";

export async function generateStaticParams() {
  // We need a dummy 't' function for this.
  const t = (key) => key;
  const allProducts = getAllProducts(t);
  return allProducts.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProductsPage" });
  const allProducts = getAllProducts(t);
  const product = allProducts.find((p) => p.id === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | AgroHarvestani`,
    description: product.description,
    openGraph: {
      title: `${product.title} | AgroHarvestani`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const SpecificationItem = ({ label, value }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 py-3 flex justify-between">
    <dt className="text-gray-600 dark:text-gray-400">{label}</dt>
    <dd className="font-semibold text-gray-900 dark:text-white text-right">
      {value}
    </dd>
  </div>
);

export default async function ProductDetailPage({ params }) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProductsPage" });
  const tDetails = await getTranslations({
    locale,
    namespace: "ProductDetails",
  });

  const allProducts = getAllProducts(t);
  const product = allProducts.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  const specifications = [
    {
      label: tDetails("origin"),
      value: tDetails(`${slug}_origin`),
    },
    {
      label: tDetails("grade"),
      value: tDetails(`${slug}_grade`),
    },
    {
      label: tDetails("packaging"),
      value: tDetails(`${slug}_packaging`),
    },
  ];

  return (
    <main className="pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {tDetails("backToProducts")}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg sm:h-96 lg:h-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Details */}
          <div>
            <p className="font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
              {t(`filter_${product.category}`)}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {tDetails(`${slug}_long_desc`)}
            </p>

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {tDetails("specifications")}
              </h2>
              <dl className="mt-4 space-y-2">
                {specifications
                  .filter((spec) => spec.value && !spec.value.includes("_")) // Filter out untranslated specs
                  .map((spec) => (
                    <SpecificationItem
                      key={spec.label}
                      label={spec.label}
                      value={spec.value}
                    />
                  ))}
              </dl>
            </div>

            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
              >
                <Link href="/contact">{tDetails("ctaButton")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
