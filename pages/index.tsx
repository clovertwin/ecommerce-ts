import type { GetServerSideProps } from "next";
import HeroBanner from "../components/HeroBanner";
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
        <h2 className="text-7xl font-extrabold text-neutral-600">
          All Products
        </h2>
        <p className="mt-3 text-2xl text-neutral-500">
          High quality devices that won&apos;t break the bank!
        </p>
      </div>
    </>
  );
};

export default Home;
