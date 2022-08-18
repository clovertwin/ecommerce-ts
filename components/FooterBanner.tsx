import Image from "next/image";
import { Banner } from "../typings";

interface Props {
  bannerData: Banner;
}

const FooterBanner = ({
  bannerData: {
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
      <div className="bg-red-500 md:px-10 md:h-[500px] md:rounded-2xl">
        <h2>{buttonText}</h2>
      </div>
    </div>
  );
};

export default FooterBanner;
