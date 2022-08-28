import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center mt-20 py-8 text-neutral-600">
      <p className="font-semibold text-center">
        2022 AccessoryShack All rights reserved
      </p>
      <p className="flex text-4xl mt-5">
        <AiOutlineTwitter className="transition ease-in-out duration-500 hover:text-black hover:cursor-pointer mr-5" />
        <AiOutlineInstagram className="transition ease-in-out duration-500 hover:text-black hover:cursor-pointer" />
      </p>
    </footer>
  );
};

export default Footer;
