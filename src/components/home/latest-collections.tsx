import { dummyLatestCollections } from "@/constants/dummy-products";
import ProductCard from "../products/product-card";
import SectionHeader from "../ui/section-header";

const LatestCollections = () => {
  return (
    <section>
      <SectionHeader
        title="Latest Collections"
        subTitle="New Arrivals added Weekly"
      />
      <div className="my-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {dummyLatestCollections.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default LatestCollections;
