"use client";

import {
  usePathname,
  useSearchParams
} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Props {
  images: {
    src: string
    alt: string
  }[];
}

export function ProductImages({ images }: Props) {

  const pathname = usePathname();
  const params = useSearchParams();
  const imageParam = params.get("image");
  const imageIndex = imageParam ? Number.parseInt(imageParam) : 0;

  const newSearchParams = new URLSearchParams(params);
  const newImageIndex = (imageIndex + 1) % images.length;
  newSearchParams.set("image", newImageIndex.toString());

  const previousSearchParams = new URLSearchParams(params);
  const previousImageIndex = (imageIndex - 1 + images.length) % images.length;
  previousSearchParams.set("image", previousImageIndex.toString());

  const nextImageUrl = pathname + "?" + newSearchParams.toString();
  const previousImageUrl = pathname + "?" + previousSearchParams.toString();

  const image = images[imageIndex];

  const hasMoreImages = images.length > 1;

  return (
      <>
        <div className="flex items-center justify-center relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
          {!!image?.src && (
              <Image alt={image.alt} src={image.src} width={500} height={500} priority />
          )}
          {hasMoreImages && (
              <div className="absolute bottom-10 flex w-full justify-center">
                <div
                    className="mx-auto px-4 flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-200 backdrop-blur dark:border-black dark:bg-neutral-900/80"
                >
                  <Link
                      href={previousImageUrl}
                      scroll={false}
                  >
                    Anterior
                  </Link>
                  <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                  <Link
                      href={nextImageUrl}
                      scroll={false}
                  >
                    Próximo
                  </Link>
                </div>
              </div>
          )}
        </div>
      </>
  );
}
