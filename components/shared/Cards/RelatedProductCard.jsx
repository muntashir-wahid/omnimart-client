import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { calcDiscountPrice, cn } from "@/lib/utils";

const RelatedProductCard = ({ product }) => {
  const {
    uid,
    price,
    discount,
    sku,
    baseProduct: { name, slug },
    ProductConfigs,
  } = product;

  console.log(ProductConfigs);

  return (
    <article className="flex flex-col gap-6 rounded-md shadow-md">
      <figure>
        <Image
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          height={360}
          width={400}
          alt="Product Image"
          className="w-full object-center rounded-md"
        />
      </figure>
      <div className="px-4 pb-6 flex flex-col gap-3">
        <div>
          <h3 className="flex flex-col font-semibold ">
            <span className="text-lg text-gray-700">{name}</span>
            <span className="text-xs text-gray-500">{sku}</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              discount > 0
                ? "line-through text-sm font-medium text-gray-500"
                : "text-l4 font-medium text-gray-800"
            )}
          >
            ${price}
          </span>
          {discount > 0 ? (
            <span className="text-lg font-medium text-gray-800">
              ${calcDiscountPrice(price, discount).toFixed(2)}
            </span>
          ) : null}
          <span></span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {ProductConfigs.map((attribute) => (
            <Badge variant="outline" key={attribute.attributeValue.name}>
              <span className="text-gray-600">
                {attribute.attributeValue.attributeUid.name}:{" "}
              </span>
              <span className="text-gray-700">
                {attribute.attributeValue.name}
              </span>
            </Badge>
          ))}
        </div>

        <Button className="self-end" asChild>
          <Link href={`/products/${slug}?item=${uid}`}>
            <Eye />
            <span>View Details</span>
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default RelatedProductCard;
