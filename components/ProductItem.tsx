import { client, urlFor } from "../lib/client";
import { useNextSanityImage } from "next-sanity-image";
import { Product } from "../typings";
import Link from "next/link";
import Image from "next/image";

interface Props {
  product: Product;
}

const Product = ({ product: { image, name, slug, price } }: Props) => {
  // const imageProps = useNextSanityImage(client, image[0]);

  return (
    <div className="hover:cursor-pointer">
      <Link href={`/product/${slug.current}`}>
        <div>
          <div className="h-80 w-80 bg-neutral-200 rounded-2xl sm:h-96 sm:w-96 md:h-80 md:w-80">
            {/* <Image {...imageProps} alt="product image" layout="responsive" /> */}
            <img src={urlFor(image[0]).url()} alt={`${name} image`} />
          </div>
          <p className="text-xl mt-5 text-neutral-500">{name}</p>
          <p className="font-bold text-2xl">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
