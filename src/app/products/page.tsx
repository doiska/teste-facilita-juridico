import {
  Filters,
  getProductByFilter
} from "@/lib/products";
import {
  Grid,
  GridItem,
  GridTileImage
} from "@/components/product-list/grid";
import Link from "next/link";

const ensureArray = (value: string | string[]) => {
  return Array.isArray(value) ? value : [value];
};

export default function Products({ searchParams }: {
  searchParams: Record<string, string>
}) {
  const filters = {
    color: searchParams.color ? ensureArray(searchParams.color) : [],
    size: searchParams.size ? ensureArray(searchParams.size) : [],
    minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : 0,
    maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : 0,
    name: searchParams.name || ""
  } as Partial<Filters>;

  const products = getProductByFilter(filters);

  return (
      <Grid>
        {products.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`}>
              <GridItem key={product.id}>
                <GridTileImage
                    href={`/product/${product.slug}`} label={product.name} src={product.images[0].src}
                    alt={product.name} active={false}
                />
                <div className="flex justify-between p-4 bg-neutral-950 border">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <span className="text-lg font-semibold">${product.price}</span>
                </div>
                <div className="flex items-center bg-neutral-950 border rounded-b">
                  <div className="flex items-center justify-center p-2 gap-2">
                    {product.colors.map((color) => (
                        <div
                            key={color}
                            className="size-6 border"
                            style={{
                              backgroundColor: color,
                            }}
                        />
                    ))}
                  </div>
                  <div className="flex items-center justify-center p-2 gap-2">
                    {product.sizes.map((size) => (
                        <div key={size} className="flex items-center justify-center size-6 border text-xs">
                          {size}
                        </div>
                    ))}
                  </div>
                </div>
              </GridItem>
            </Link>
        ))}
      </Grid>
  );
}
