import Banner from './components/banner/banner';
import Companies from './components/companies/companies'
import Work from './components/work/work';
import Table from './components/table/table';
import Features from './components/features/features';
import Simple from './components/simple/simple';
import Trade from './components/trade/trade';
import Faq from './components/faq/faq';
import Navbar from './components/navbar/index';
import Footer from './components/footer/footer';


export default function Home() {
    return (
        <main>
            <Navbar />
            <Banner />
            <Companies />
            <Work />
            <Table />
            <Features />
            <Simple />
            <Trade />
            <Faq />
            <Footer />
        </main>
    )
}
