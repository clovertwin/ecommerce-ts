import Link from "next/link";

const HeroBanner = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-6 h-[500px] bg-neutral-300 mt-20 rounded-2xl px-10">
      <div className="col-start-1 col-end-5 row-start-2 row-end-5 leading-[.8] text-left">
        <h3 className="text-2xl ml-1.5">Don&apos;t miss out!</h3>
        <h3 className="text-7xl font-bold ml-1">Summer</h3>
        <h3 className="text-[164px] font-bold text-neutral-50 tracking-tighter">
          SALE
        </h3>
      </div>
      <div className="col-start-1 col-end-4 row-start-5 row-end-6">
        <Link href="#">
          <button
            type="button"
            className="rounded-full py-2 px-7 mt-5 ml-1.5 text-neutral-50 bg-red-500 text-2xl font-semibold transition-transform ease-in-out duration-500 hover:scale-110 hover:bg-red-600"
          >
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
