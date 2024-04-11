import { Suspense } from "react";
import { FilterList } from "@/components/product-list/filter";

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
      <Suspense>
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 text-black md:flex-row dark:text-white">
          <div className="order-none flex-none md:order-first md:w-[125px]">
            <FilterList />
          </div>
          <div className="order-last min-h-screen w-full md:order-none">{children}</div>
        </div>
      </Suspense>
  );
}
