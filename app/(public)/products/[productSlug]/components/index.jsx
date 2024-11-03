"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import APIKit from "@/lib/apiKit";
import { calcDiscountPrice, cn } from "@/lib/utils";
import { getToken } from "@/actions/cookieActions";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Container from "@/components/shared/Container/Container";
import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import RelatedProducts from "./RelatedProducts";

const ProductDetailsModule = ({ productSlug }) => {
  const searchParams = useSearchParams().get("sku");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [`products/${productSlug}${searchParams ? searchParams : ""}`],
    queryFn: () =>
      APIKit.products.getProductDetails(productSlug, { sku: searchParams }),
  });

  if (isLoading) {
    return <DataLoadingState content="Product Details is Loading..." />;
  }

  const {
    product: {
      slug,
      name,
      about,
      productItem: { uid, discount, price, sku, stock },
      category: { name: categoryName },
      attributes,
    },
  } = data.data;

  const handleAddProductToCart = async () => {
    const token = await getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    await APIKit.cart.addProductToCart({
      productUid: uid,
    });

    queryClient.refetchQueries({
      queryKey: ["cart"],
    });
  };

  return (
    <Container extraClassName="p-4 flex flex-col gap-16">
      <div className="flex flex-col md:flex-row md:items-start gap-8">
        <figure className="w-full md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=700"
            height={500}
            width={650}
            alt="Product Details Image"
            className="w-full max-h-[500px] rounded-xl"
          />
        </figure>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="flex items-center gap-2 font-semibold text-gray-600">
              <span className="text-3xl">{name}</span>
              <Badge variant="outline" className="text-xs">
                {sku}
              </Badge>
            </h1>
            <p className="text-sm font-bold text-gray-600">{categoryName}</p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                discount > 0
                  ? "line-through text-lg font-medium text-gray-500"
                  : "text-2xl font-medium text-gray-800"
              )}
            >
              ${price}
            </span>
            {discount > 0 ? (
              <span className="text-2xl font-medium text-gray-800">
                ${calcDiscountPrice(price, discount).toFixed(2)}
              </span>
            ) : null}
            <span></span>
          </div>

          <p className="font-semibold text-gray-700">{stock} in Stock</p>

          <div className="flex items-center flex-wrap gap-4">
            {attributes.map((attribute) => (
              <div
                key={attribute.attributeValue.name}
                className="border border-gray-700 rounded-md px-3 py-2 flex items-center gap-2 shadow"
              >
                <span className="text-gray-600">
                  {attribute.attributeValue.attributeUid.name}:{" "}
                </span>
                <span className="text-gray-700">
                  {attribute.attributeValue.name}
                </span>
              </div>
            ))}
          </div>

          <p className="font-medium text-gray-600">Description: {about}</p>

          <Button className="self-start" onClick={handleAddProductToCart}>
            <ShoppingCart />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>

      <div>
        <h4 className="text-2xl font-bold text-gray-700 mb-8">
          Related Products
        </h4>
        <RelatedProducts currentItemUid={uid} productSlug={slug} />
      </div>
    </Container>
  );
};

export default ProductDetailsModule;
