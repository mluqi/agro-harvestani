// This file centralizes the data for all products, making it easier to manage.

export const productCategories = [
  "all",
  "spices",
  "grains",
  "fruits",
  "oils",
  "vegetables", // Harvestani Greens
  "processed", // Harvestani Naturals
  "distribution", // Harvestani Global Trade
];

export const getAllProducts = (t) => [
  // Spices
  {
    id: "cloves",
    category: "spices",
    image: "/products/cloves.png",
    title: t("cloves_title"),
    description: t("cloves_desc"),
  },
  {
    id: "cinnamon",
    category: "spices",
    image: "/products/cinnamon.png",
    title: t("cinnamon_title"),
    description: t("cinnamon_desc"),
  },
  {
    id: "nutmeg",
    category: "spices",
    image: "/products/nutmeg.png",
    title: t("nutmeg_title"),
    description: t("nutmeg_desc"),
  },
  // Grains
  {
    id: "coffee",
    category: "grains",
    image: "/products/coffe.png",
    title: t("coffee_title"),
    description: t("coffee_desc"),
  },
  // Fruits
  {
    id: "mangosteen",
    category: "fruits",
    image: "/products/mangosteen.png",
    title: t("mangosteen_title"),
    description: t("mangosteen_desc"),
  },
  // Oils
  {
    id: "coconut-oil",
    category: "oils",
    image: "/products/coconut-oil.png",
    title: t("coconut_oil_title"),
    description: t("coconut_oil_desc"),
  },
  // Vegetables
  {
    id: "shallots",
    category: "vegetables",
    image: "/products/shallots.png",
    title: t("shallots_title"),
    description: t("shallots_desc"),
  },
  // Processed
  {
    id: "turmeric-powder",
    category: "processed",
    image: "/products/turmeric-powder.png",
    title: t("turmeric_powder_title"),
    description: t("turmeric_powder_desc"),
  },
];
