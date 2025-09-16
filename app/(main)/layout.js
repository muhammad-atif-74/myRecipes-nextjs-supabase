import Navbar from "../components/common/Navbar";
import Footer from "../components/sections/Footer";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
