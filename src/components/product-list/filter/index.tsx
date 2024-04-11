"use client";

import {
  ComponentPropsWithoutRef,
  Suspense
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import { getAvailableFilterOptions } from "@/lib/products";
import { cn } from "@/lib/utils";

export type PathFilterItem = {
  title: string;
  path: string
};

const fields = [
  {
    title: "Cores",
    slug: "color"
  },
  {
    title: "Tamanho",
    slug: "size"
  },
  {
    title: "Preço mínimo",
    slug: "minPrice"
  },
  {
    title: "Preço máximo",
    slug: "maxPrice"
  }
];

function InputRange(props: ComponentPropsWithoutRef<"input">) {

  return (
      <li>
        <input
            type="number"
            min={0}
            step={1}
            className="w-full p-2 mt-1 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800"
            {...props}
        />
      </li>
  );
}

function FilterItemList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pushFilter = (filterKey: string, filterValues: string[]) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete(filterKey);

    for (const value of filterValues) {
      newSearchParams.append(filterKey, value);
    }

    const url = `${pathname}?${newSearchParams.toString()}`;
    router.push(url);
  };

  const options = getAvailableFilterOptions();

  return (
      <div className="flex flex-col">
        {fields.map((field) => {
          const activeFilters = searchParams.getAll(field.slug);

          return (
              <div key={field.slug} className="mt-6">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {field.title}
                </h4>
                <ul className="mt-2">
                  {field.slug === "minPrice" || field.slug === "maxPrice" ? (
                      <InputRange
                          value={activeFilters[0] || ""}
                          onChange={(e) => pushFilter(field.slug, [e.target.value])}
                          min={options.minPrice}
                          max={options.maxPrice}
                          placeholder={field.slug === "minPrice" ? "Mínimo" : "Máximo"}
                      />
                  ) : (
                      // Just to make TypeScript happy
                      options[field.slug === "color" ? "color" : "size"].map((option) => {
                        const active = activeFilters.includes(option);
                        const newFilters = active
                            ? activeFilters.filter((filter) => filter !== option)
                            : [...activeFilters, option];

                        return (
                            <li key={option}>
                              <button
                                  onClick={() => pushFilter(field.slug, newFilters)}
                                  className={cn(
                                      "w-full p-2 mt-1 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800",
                                      {
                                        "bg-blue-600 dark:bg-blue-500": active
                                      }
                                  )}
                              >
                                {option}
                              </button>
                            </li>
                        );
                      })
                  )}
                </ul>
              </div>
          );
        })}
      </div>
  );
}

export function FilterList() {
  return (
      <>
        <nav>
          <h3 className="hidden text-lg text-neutral-500 md:block dark:text-neutral-400">
            Filtros
          </h3>
          <ul className="md:block">
            <Suspense fallback={null}>
              <FilterItemList />
            </Suspense>{" "}
          </ul>
        </nav>
      </>
  );
}
