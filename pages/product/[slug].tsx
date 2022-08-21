import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { client, urlFor } from "../../lib/client";
import { Product } from "../../typings";
import ProductItem from "../../components/ProductItem";
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
    <div className="mt-10 text-neutral-600 md:mt-20">
      <div className="md:flex md:items-start md:justify-start">
        <div className="flex flex-col items-center md:items-start md:mr-5 lg:mr-10">
          <div className="h-80 w-80 bg-neutral-200 rounded-xl hover:bg-red-500 transition-colors ease-in-out duration-300 md:h-96 md:w-96">
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
                className={`h-16 w-16 rounded-xl mr-2 transition-colors ease-in-out duration-300 md:h-20 md:w-20 ${
                  i === index ? "bg-red-500" : "bg-neutral-200"
                }`}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center md:items-start">
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
              <div className="flex items-center justify-center px-3 py-1 hover:cursor-pointer">
                <AiOutlineMinus />
              </div>
              <div className="flex items-center justify-center px-4 py-1 border-x border-neutral-600">
                <p className="text-2xl">1</p>
              </div>
              <div className="flex items-center justify-center px-3 py-1 hover:cursor-pointer">
                <AiOutlinePlus />
              </div>
            </div>
          </div>
          <div className="flex w-80 mt-10 items-center justify-center lg:w-96">
            <button className="px-5 py-2 bg-neutral-50 border border-red-500 text-lg font-medium text-red-500 mr-6 w-36 transition-transform ease-in-out duration-300 hover:scale-110 lg:w-52">
              Add To Cart
            </button>
            <button className="px-5 py-2 bg-red-500 text-neutral-50 text-lg font-medium w-36 border border-red-500 transition-transform ease-in-out duration-300 hover:scale-110 lg:w-52">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <h3 className="mt-24 font-bold text-3xl text-center">
        You may also like
      </h3>
      <div className="mt-10 relative overflow-x-hidden w-full flex">
        <div className="animate-marquee whitespace-nowrap flex">
          {products.map((product) => (
            <div key={product._id} className="mr-5">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
