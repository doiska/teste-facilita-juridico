'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SearchCheck } from "lucide-react";

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('name', search.value);
    } else {
      newParams.delete('name');
    }

    const url = newParams.toString() ? `/products?${newParams.toString()}` : '/products';

    router.push(url);
  }

  return (
      <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
        <input
            key={searchParams?.get('name')}
            type="text"
            name="search"
            placeholder="Pesquisar..."
            autoComplete="off"
            defaultValue={searchParams?.get('name') || ''}
            className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <SearchCheck className="h-4" />
        </div>
      </form>
  );
}

export function SearchSkeleton() {
  return (
      <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
        <input
            placeholder="Search for products..."
            className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <SearchCheck className="h-4" />
        </div>
      </form>
  );
}
