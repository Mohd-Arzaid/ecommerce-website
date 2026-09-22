import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import SearchInput from "../ui/search-input";

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <SearchInput />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default FrontendLayout;
