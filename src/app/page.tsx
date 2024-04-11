import { getAvailableFilterOptions } from "@/lib/products";

function FilterOptionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold">{children}</h3>;

}

function FilterOption({ children }: { children: React.ReactNode }) {
  return (
    <li className="p-2 bg-neutral-950 rounded">
      <h3 className="text-lg font-bold">Preço</h3>
      {children}
    </li>
  );
}

export default function Home() {

  const filterOptions = getAvailableFilterOptions();

  return (
    <main className="flex min-h-screen p-24">

    </main>
  );
}
