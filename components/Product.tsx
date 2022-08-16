import { client } from "../lib/client";
import { useNextSanityImage } from "next-sanity-image";
import { Product } from "../typings";
import Link from "next/link";
import Image from "next/image";

interface Props {
  product: Product;
}

const Product = ({ product: { image, name, slug, price } }: Props) => {
  const imageProps = useNextSanityImage(client, image);

  return (
    <>
      <Link href={`/product/${slug.current}`}>
        <div>
          <div>
            <Image {...imageProps} alt={`${name} image`} layout="responsive" />
          </div>
          <p>{name}</p>
          <p>${price}</p>
        </div>
      </Link>
    </>
  );
};

export default Product;
