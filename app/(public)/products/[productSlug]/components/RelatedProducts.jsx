import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import RelatedProductCard from "@/components/shared/Cards/RelatedProductCard";

const RelatedProducts = ({ currentItemUid, productSlug }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`products/${productSlug}/related/${currentItemUid}`],
    queryFn: () =>
      APIKit.products.getRelatedProductList(productSlug, currentItemUid),
  });

  if (isLoading) {
    return <DataLoadingState content="Product Details is Loading..." />;
  }

  const { product: relatedProducts } = data.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {relatedProducts.map((product) => (
        <RelatedProductCard key={product.uid} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
