const products = [
  {
    id: 1,
    name: "Product 1",
    slug: "product-1",
    price: 100,
    sizes: ["P", "M"],
    colors: ["red", "green"],
    images: [
      {
        src: "/tshirt_red_1.jpeg",
        alt: "Product 1"
      },
      {
        src: "/tshirt_red_2.jpeg",
        alt: "Product 1"
      },
      {
        src: "/tshirt_green.jpeg",
        alt: "Product 1"
      },
    ]
  },
  {
    id: 2,
    name: "Product 2",
    slug: "product-2",
    price: 200,
    sizes: ["G", "GG"],
    colors: ["black", "white", "yellow"],
    images: [
      {
        src: "/tshirt_white.png",
        alt: "Product 2"
      },
      {
        src: "/tshirt_black_1.jpeg",
        alt: "Product 2"
      },
      {
        src: "/tshirt_black_2.jpeg",
        alt: "Product 2"
      },
    ]
  },
  {
    id: 3,
    name: "Product 3",
    slug: "product-3",
    price: 300,
    sizes: ["P", "M", "G", "XL"],
    colors: ["yellow"],
    images: [
      {
        src: "/tshirt_yellow_1.jpeg",
        alt: "Product 3"
      },
      {
        src: "/tshirt_yellow_2.jpeg",
        alt: "Product 3"
      },
    ]
  },
];

export function getProducts() {
  return products;
}

export interface Filters {
  color: string[];
  size: string[];
  minPrice: number;
  maxPrice: number;
  name: string;
}

export function getProductByFilter(filter: Partial<Filters>) {
  const filteredProducts = [];

  for (const product of products) {
    if (filter.minPrice && product.price < filter.minPrice) {
      continue;
    }

    if (filter.maxPrice && product.price > filter.maxPrice) {
      continue;
    }

    if (!!filter.name && !product.name.includes(filter.name)) {
      continue;
    }

    if (filter.color && filter.color.length > 0 && !filter.color.some((color) => product.colors.includes(color))) {
      continue;
    }

    if (filter.size && filter.size.length > 0 && !filter.size.some((size) => product.sizes.includes(size))) {
      continue;
    }

    filteredProducts.push(product);
  }

  return filteredProducts;
}

export function getAvailableFilterOptions() {
  const filters = new Map<"color" | "size", string[]>();

  for (const product of products) {
    for (const color of product.colors) {
      const colors = filters.get("color") || [];

      if (!colors.includes(color)) {
        colors.push(color);
      }

      filters.set("color", colors);
    }

    for (const size of product.sizes) {
      const sizes = filters.get("size") || [];

      if (!sizes.includes(size)) {
        sizes.push(size);
      }

      filters.set("size", sizes);
    }
  }

  const prices = products.map((product) => product.price);

  return {
    color: filters.get("color") || [],
    size: filters.get("size") || [],
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
