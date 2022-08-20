import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { client, urlFor } from "../../lib/client";
import { Product } from "../../typings";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";

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
    <div className="mt-10 text-neutral-600">
      <div className="flex flex-col items-center">
        <div className="h-80 w-80 bg-neutral-200 rounded-xl hover:bg-red-500 transition-colors ease-in-out duration-300">
          <img
            src={urlFor(product.image[index]).url()}
            alt={`${product.name} image`}
          />
        </div>
        <div className="flex justify-start mt-5 w-80">
          {product.image?.map((img, i) => (
            <img
              key={i}
              src={urlFor(img).url()}
              alt={`${i} product image`}
              className={`h-16 w-16 rounded-xl mr-2 transition-colors ease-in-out duration-300 ${
                i === index ? "bg-red-500" : "bg-neutral-200"
              }`}
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center">
        <h2 className="w-80 font-bold text-3xl">{product.name}</h2>
        <div className="flex items-center w-80 text-red-500 mt-2">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
          <p className="ml-2 text-neutral-600">(20)</p>
        </div>
        <h3 className="w-80 mt-2 font-bold text-lg">Details:</h3>
        <p className="w-80 mt-2">{product.details}</p>
        <h3 className="w-80 mt-5 font-bold text-3xl text-red-500">
          ${product.price}
        </h3>
        <div className="flex items-center w-80 mt-5">
          <h3 className="font-bold text-xl mr-5">Quantity:</h3>
          <div className="border flex border-neutral-600">
            <div className="flex items-center justify-center px-3 py-2">
              <AiOutlineMinus />
            </div>
            <div className="flex items-center justify-center px-4 py-2 border-x border-neutral-600">
              <p className="text-2xl">1</p>
            </div>
            <div className="flex items-center justify-center px-3 py-2">
              <AiOutlinePlus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
