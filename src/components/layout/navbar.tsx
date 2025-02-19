import Link from "next/link";
import { Suspense } from "react";
import { NavbarMobile } from "@/components/layout/navbar-mobile";
import { Search } from "@/components/layout/navbar-search";

const menu = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Produtos",
    path: "/products",
  },
];

export function Navbar() {
  return (
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <NavbarMobile />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block" />
            </Link>
            {menu.length ? (
                <ul className="hidden gap-6 text-sm md:flex md:items-center">
                  {menu.map((item) => (
                      <li key={item.title}>
                        <Link
                            href={item.path}
                            className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                        >
                          {item.title}
                        </Link>
                      </li>
                  ))}
                </ul>
            ) : null}
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense>
              <Search />
            </Suspense>
          </div>
        </div>
      </nav>
  )
}
