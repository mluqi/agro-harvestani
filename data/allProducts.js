// This file centralizes the data for all products, making it easier to manage.

export const productCategories = [
  "all",
  "fresh", // Harvestani Fresh
  "roots-and-greens", // Harvestani Roots and Greens
  "spiceworks", // Harvestani Spiceworks
  "roast", // Harvestani Roast
  "grains",
  "essenza", // Harvestani Essenza
  "agro", // Harvestani Agro
];

export const getAllProducts = (t) => [
  // Harvestani Fresh
  {
    id: "pineapple",
    category: "fresh",
    image: "/assets/placeholder.jpeg",
    title: t("pineapple_title"),
    description: t("pineapple_desc"),
  },
  {
    id: "mangosteen",
    category: "fresh",
    image: "/products/mangosteen.png",
    title: t("mangosteen_title"),
    description: t("mangosteen_desc"),
  },
  {
    id: "durian",
    category: "fresh",
    image: "/assets/placeholder.jpeg",
    title: t("durian_title"),
    description: t("durian_desc"),
  },
  {
    id: "banana",
    category: "fresh",
    image: "/assets/placeholder.jpeg",
    title: t("banana_title"),
    description: t("banana_desc"),
  },
  {
    id: "avocado",
    category: "fresh",
    image: "/assets/placeholder.jpeg",
    title: t("avocado_title"),
    description: t("avocado_desc"),
  },
  // Harvestani Roots and Greens
  {
    id: "cabbage",
    category: "roots-and-greens",
    image: "/assets/placeholder.jpeg",
    title: t("cabbage_title"),
    description: t("cabbage_desc"),
  },
  {
    id: "tomato",
    category: "roots-and-greens",
    image: "/assets/placeholder.jpeg",
    title: t("tomato_title"),
    description: t("tomato_desc"),
  },
  {
    id: "carrot",
    category: "roots-and-greens",
    image: "/assets/placeholder.jpeg",
    title: t("carrot_title"),
    description: t("carrot_desc"),
  },
  {
    id: "chili",
    category: "roots-and-greens",
    image: "/assets/placeholder.jpeg",
    title: t("chili_title"),
    description: t("chili_desc"),
  },
  {
    id: "cassava",
    category: "roots-and-greens",
    image: "/assets/placeholder.jpeg",
    title: t("cassava_title"),
    description: t("cassava_desc"),
  },
  {
    id: "potato",
    category: "roots-and-greens",
    image: "/assets/placeholder.jpeg",
    title: t("potato_title"),
    description: t("potato_desc"),
  },
  {
    id: "sweet-potato",
    category: "roots-and-greens",
    image: "/assets/placeholder.jpeg",
    title: t("sweet_potato_title"),
    description: t("sweet_potato_desc"),
  },
  {
    id: "shallots",
    category: "roots-and-greens",
    image: "/products/shallots.png",
    title: t("shallots_title"),
    description: t("shallots_desc"),
  },
  // Harvestani Spiceworks
  {
    id: "cloves",
    category: "spiceworks",
    image: "/products/cloves.png",
    title: t("cloves_title"),
    description: t("cloves_desc"),
  },
  {
    id: "nutmeg",
    category: "spiceworks",
    image: "/products/nutmeg.png",
    title: t("nutmeg_title"),
    description: t("nutmeg_desc"),
  },
  // ... (add other spiceworks products here following the same pattern)
  // Harvestani Roast
  {
    id: "coffee",
    category: "roast",
    image: "/products/coffe.png",
    title: t("coffee_title"),
    description: t("coffee_desc"),
  },
  {
    id: "cocoa",
    category: "roast",
    image: "/assets/placeholder.jpeg",
    title: t("cocoa_title"),
    description: t("cocoa_desc"),
  },
  // Harvestani Grains
  {
    id: "peanut",
    category: "grains",
    image: "/assets/placeholder.jpeg",
    title: t("peanut_title"),
    description: t("peanut_desc"),
  },
  {
    id: "corn",
    category: "grains",
    image: "/assets/placeholder.jpeg",
    title: t("corn_title"),
    description: t("corn_desc"),
  },
  // Harvestani Essenza
  {
    id: "vco",
    category: "essenza",
    image: "/assets/placeholder.jpeg",
    title: t("vco_title"),
    description: t("vco_desc"),
  },
  // Harvestani Agro
  {
    id: "copra",
    category: "agro",
    image: "/assets/placeholder.jpeg",
    title: t("copra_title"),
    description: t("copra_desc"),
  },
];
