import Image from "next/image";
import Link from "next/link";
import { Banner } from "../typings";

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
  },
}: Props) => {
  return (
    <div className="mt-20">
      <div className="bg-red-500 flex flex-col items-start justify-between h-[500px] p-5 md:px-10 md:h-[500px] md:rounded-2xl">
        <div>
          <h3 className="text-4xl text-neutral-50">{midText}</h3>
          <h2 className="text-8xl text-neutral-50 font-bold tracking-tighter">
            {largeText1}
          </h2>
          <h2 className="text-8xl text-neutral-50 font-bold tracking-tighter">
            {largeText2}
          </h2>
        </div>
        <div>
          <p className="text-neutral-50 text-2xl">{smallText}</p>
          <h3 className="text-6xl text-neutral-50 font-bold">{discount}</h3>
          <p className="text-neutral-50 text-2xl">{saleTime}</p>
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
