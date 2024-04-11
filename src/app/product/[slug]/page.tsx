import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductImages } from "@/components/product-images";
import { Suspense } from "react";
import { ProductDescription } from "@/components/product-description";

export default async function Product({ params }: {
  params: {
    slug: string
  }
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return (
      <div className="mx-auto max-w-screen-2xl px-4 py-4">
        <div
            className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black"
        >
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
                fallback={
                  <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
                }
            >
              <ProductImages images={product.images} />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
      </div>
  );
}

