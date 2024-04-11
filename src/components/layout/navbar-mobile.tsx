"use client"

import { useState } from "react";
import { Search } from "@/components/layout/navbar-search";

export function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
      >
        <span className="sr-only">Open the menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>
      {isOpen && (
        <div className="fixed inset-0 w-full h-full bg-white z-10 dark:bg-neutral-900">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 left-4 h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
          >
            <span className="sr-only">Close the menu</span>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="flex flex-col items-center gap-4 h-full py-24 px-4">
            <Search />
            <li>
              <a
                href="/"
                className="text-lg font-medium text-black dark:text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="text-lg font-medium text-black dark:text-white"
              >
                Produtos
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
