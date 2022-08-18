import type { GetServerSideProps } from "next";
import FooterBanner from "../components/FooterBanner";
import HeroBanner from "../components/HeroBanner";
import ProductItem from "../components/ProductItem";
import { client } from "../lib/client";
import { Banner, Product } from "../typings";

interface Props {
  products: Product[];
  bannerData: Banner[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const query = "*[_type == 'product']";
  const products = await client.fetch(query);
  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData },
  };
};

const Home = ({ products, bannerData }: Props) => {
  return (
    <>
      <HeroBanner bannerData={bannerData[0]} />
      <div className="mt-20 flex flex-col items-center">
        <h2 className="text-5xl font-extrabold text-neutral-600 text-center">
          All Products
        </h2>
        <p className="mt-3 text-2xl text-neutral-500 text-center">
          High quality devices that won&apos;t break the bank!
        </p>
        <div className="grid grid-cols-1 auto-rows-auto gap-6 mt-10 md:grid-cols-2 xl:grid-cols-3">
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
      <FooterBanner bannerData={bannerData[0]} />
    </>
  );
};

export default Home;
