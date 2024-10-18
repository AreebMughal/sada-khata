import Banner from './components/banner/banner';
import Faq from './components/faq/faq';
import Features from './components/features/features';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/index';
import Simple from './components/simple/simple';
import Table from './components/table/table';
import Trade from './components/trade/trade';
import Work from './components/work/work';

export default function Home() {
  return (
    <main className="home">
      <Navbar />
      <Banner />
      {/* <Companies /> */}
      <Work />
      <Table />
      <Features />
      <Simple />
      <Trade />
      <Faq />
      <Footer />
    </main>
  );
}
