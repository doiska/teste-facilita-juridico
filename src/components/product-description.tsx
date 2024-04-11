interface Props {
  product: {
    name: string;
    price: number;
  }
}

export function ProductDescription({ product }: Props) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
      <div className="relative mb-6 flex flex-col gap-2 dark:border-neutral-700 h-full">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded bg-blue-600 p-2 text-sm text-white font-bold">
          <span>{formattedPrice}</span>
        </div>
        <div className="flex-1">
          <p className="text-lg mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            sollicitudin, quam nec fermentum varius, nulla nisl aliquet
            tortor, non tincidunt nisl justo at nunc.
          </p>
        </div>
        <div>
          <button className="mt-4 w-full py-3 bg-blue-700 text-white font-bold rounded-lg">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
  );
}
