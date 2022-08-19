import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../lib/client";
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
  return (
    <div>
      <h1>{product.name}</h1>
      <h2>{products[0].name}</h2>
    </div>
  );
};

export default ProductPage;
