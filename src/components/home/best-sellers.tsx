import { dummyBestSellers } from "@/constants/dummy-products";
import SectionHeader from "../ui/section-header";
import ProductCard from "../products/product-card";

const BestSellers = () => {
  return (
    <section>
      <SectionHeader
        title="Best Sellers"
        subTitle="Discover our most-loved pieces, carefully selected by thousands of happy customers. Timeless styles designed to elevate your wardrobe."
      />
      <div className="my-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {dummyBestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
