import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Head>
        <title>AccessoryShack</title>
      </Head>
      <Navbar />
      <main className="mx-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
