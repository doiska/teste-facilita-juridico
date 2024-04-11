import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

export function Grid(props: React.ComponentProps<"ul">) {
  return (
      <ul {...props} className={cn("grid md:grid-cols-2 lg:grid-cols-4 grid-flow-row gap-4", props.className)}>
        {props.children}
      </ul>
  );
}

export function GridItem(props: React.ComponentProps<"li">) {
  return (
      <li {...props} className={cn("aspect-square transition-opacity", props.className)}>
        {props.children}
      </li>
  );
}

interface Props extends ComponentPropsWithoutRef<typeof Image>{
  href: string;
  label: string;
  active: boolean;
}

export function GridTileImage({ active, href, label, ...props }: Props) {
  return (
      <div
          className={cn(
              "relative group flex h-full w-full items-center justify-center overflow-hidden rounded-lg rounded-b-none border bg-white hover:border-blue-600 dark:bg-black",
              {
                relative: label,
                "border-2 border-blue-600": active,
                "border-neutral-200 dark:border-neutral-800": !active
              }
          )}
      >
        {props.src ? (
            <Image
                className="relative object-cover transition duration-300 ease-in-out group-hover:scale-105"
                fill={true}
                {...props}
            />
        ) : null}
      </div>
  );
}
