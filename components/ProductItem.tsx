import { client } from "../lib/client";
import { useNextSanityImage } from "next-sanity-image";
import { Product } from "../typings";
import Link from "next/link";
import Image from "next/image";

interface Props {
  product: Product;
}

const Product = ({ product: { image, name, slug, price } }: Props) => {
  const imageProps = useNextSanityImage(client, image[0]);

  return (
    <div className="hover:cursor-pointer mt-10 rounded-2xl shadow-lg p-10 m-5">
      <Link href={`/product/${slug.current}`}>
        <div>
          <div className="h-60 w-60">
            <Image {...imageProps} alt="product image" layout="responsive" />
          </div>
          <p className="text-xl mt-5 text-neutral-500">{name}</p>
          <p className="font-bold text-2xl">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
