import Link from "next/link";
import { Banner } from "../typings";
import { urlFor } from "../lib/client";

interface Props {
  bannerData: Banner;
}

const HeroBanner = ({
  bannerData: {
    smallText,
    midText,
    largeText1,
    desc,
    product,
    buttonText,
    image,
  },
}: Props) => {
  return (
    <div className="h-auto bg-neutral-300 text-center py-5 flex flex-col items-center sm:h-[800px] md:items-start md:grid md:mt-20 md:rounded-2xl md:text-left md:grid-cols-6 md:grid-rows-6 md:px-10 md:h-[500px]">
      <div className="leading-[.8] text-left md:col-start-1 md:col-end-5 md:row-start-2 md:row-end-6">
        <h3 className="text-center text-neutral-600 font-semibold text-2xl ml-1.5 md:text-left lg:text-3xl">
          {smallText}
        </h3>
        <h3 className="text-center font-bold ml-1 text-6xl mt-3 md:mt-0 md:text-left md:text-7xl lg:text-8xl">
          {midText}
        </h3>
        <h3 className="text-center font-bold text-neutral-50 tracking-tighter leading-[.8] text-9xl md:text-left md:text-[160px] lg:text-[160px]">
          {largeText1}
        </h3>
      </div>
      <div className="h-80 w-80 mt-5 sm:h-[400px] sm:w-[400px] md:col-start-2 md:col-end-7 md:justify-self-end lg:col-start-3 lg:justify-self-center">
        <img src={urlFor(image).url()} alt="banner image" />
      </div>
      <div className="flex flex-col md:col-start-2 md:col-end-7 md:justify-self-end md:mr-10 md:row-start-6 md:row-end-7 lg:ml-10 lg:col-start-3 lg:col-end-7 lg:justify-self-center">
        <h3 className="text-xl lg:text-2xl text-neutral-600">{desc}</h3>
      </div>
      <div className="col-start-1 col-end-4 row-start-5 row-end-6 mb-10 lg:row-start-6 lg:row-end-7">
        <Link href={`/product/${product}`}>
          <button
            type="button"
            className="rounded-full py-2 px-7 mt-10 ml-1.5 text-neutral-50 bg-red-500 text-2xl font-semibold transition-transform ease-in-out duration-500 hover:scale-110 hover:bg-red-600 lg:mt-0"
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
