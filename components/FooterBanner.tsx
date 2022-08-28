import Link from "next/link";
import { Banner } from "../typings";
import { urlFor } from "../lib/client";

interface Props {
  bannerData: Banner;
}

const FooterBanner = ({
  bannerData: {
    product,
    buttonText,
    smallText,
    midText,
    largeText1,
    largeText2,
    discount,
    saleTime,
    image,
  },
}: Props) => {
  return (
    <div className="mt-20">
      <div className="bg-red-500 flex flex-col items-center justify-between h-[700px] text-center p-5 md:flex-row md:px-10 md:h-[500px] md:rounded-2xl">
        <div>
          <h3 className="text-4xl text-neutral-50 lg:text-5xl">{midText}</h3>
          <h2 className="text-7xl text-neutral-50 font-bold tracking-tighter lg:text-8xl xl:text-9xl">
            {largeText1}
          </h2>
          <h2 className="text-7xl text-neutral-50 font-bold tracking-tighter lg:text-8xl xl:text-9xl">
            {largeText2}
          </h2>
        </div>
        <div className="h-60 w-60 md:h-80 md:w-80 xl:h-96 xl:w-96">
          <img src={urlFor(image).url()} alt="banner image" />
        </div>
        <div>
          <p className="text-neutral-50 text-2xl lg:text-3xl">{smallText}</p>
          <h3 className="text-6xl text-neutral-50 font-bold lg:text-7xl xl:text-8xl">
            {discount}
          </h3>
          <p className="text-neutral-50 text-2xl lg:text-3xl">{saleTime}</p>
          <Link href={`/product/${product}`}>
            <button
              type="button"
              className="px-7 py-2 rounded-full bg-neutral-50 text-red-500 text-2xl font-semibold mt-5 transition-transform ease-in-out duration-300 hover:scale-110"
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
