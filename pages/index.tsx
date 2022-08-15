import type { GetServerSideProps } from "next";
import HeroBanner from "../components/HeroBanner";
import { client } from "../lib/client";

interface Product {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  details: string;
  image: [object[]];
  name: string;
  price: number;
  slug: { current: string };
}

interface Banner {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  buttonText: string;
  desc: string;
  discount: string;
  image: object;
  largeText1: string;
  largeText2: string;
  midText: string;
  product: string;
  saleTime: string;
  smallText: string;
}

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
      <HeroBanner />
      <h1 className="text-center font-extrabold text-9xl">
        {bannerData[0].largeText1}
      </h1>
      <h1 className="text-center font-extrabold text-9xl">
        {bannerData[0].largeText1}
      </h1>
      <h1 className="text-center font-extrabold text-9xl">
        {bannerData[0].largeText1}
      </h1>
      <h1 className="text-center font-extrabold text-9xl">
        {bannerData[0].largeText1}
      </h1>
      <h1 className="text-center font-extrabold text-9xl">
        {bannerData[0].largeText1}
      </h1>
      <h1 className="text-center font-extrabold text-9xl">
        {bannerData[0].largeText1}
      </h1>
      <h1 className="text-center font-extrabold text-9xl">
        {bannerData[0].largeText1}
      </h1>
      <h1 className="text-center font-extrabold text-9xl">
        {bannerData[0].largeText1}
      </h1>
      <h1 className="text-center font-extrabold text-9xl">
        {bannerData[0].largeText1}
      </h1>
    </>
  );
};

export default Home;
