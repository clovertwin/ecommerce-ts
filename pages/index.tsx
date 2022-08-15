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
      <h1 className="text-center font-extrabold text-4xl md:text-9xl">
        {bannerData[0].largeText1}
      </h1>
    </>
  );
};

export default Home;
