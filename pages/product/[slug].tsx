import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { client, urlFor } from "../../lib/client";
import { Product } from "../../typings";

type Products = Product[];

interface Slug {
  current: string;
}

interface ProductPath {
  slug: Slug;
}

interface Props {
  product: Product;
  products: Products;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == 'product'] {
    slug {
        current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product: ProductPath) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'product' && slug.current == '${params?.slug}'][0]`;
  const productsQuery = `*[_type == 'product']`;
  const product = (await client.fetch(query)) as Product;
  const products = (await client.fetch(productsQuery)) as Products;
  return {
    props: {
      product,
      products,
    },
  };
};

export const ProductPage = ({ product, products }: Props) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="mt-10">
      <div className="flex flex-col items-center">
        <div className="h-80 w-80 bg-neutral-200 rounded-xl hover:bg-red-500 transition-colors ease-in-out duration-300">
          <img
            src={urlFor(product.image[index]).url()}
            alt={`${product.name} image`}
          />
        </div>
        <div className="flex justify-between mt-10">
          {product.image?.map((img, i) => (
            <img
              key={i}
              src={urlFor(img).url()}
              alt={`${i} product image`}
              className={`h-16 w-16 rounded-xl m-1 transition-colors ease-in-out duration-300 ${
                i === index ? "bg-red-500" : "bg-neutral-200"
              }`}
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
