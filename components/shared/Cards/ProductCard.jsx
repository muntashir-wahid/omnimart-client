import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

const ProductCard = ({
  product: {
    name,
    about,
    slug,
    basePrice,
    category: { name: categoryName },
    ProductImages,
  },
}) => {
  return (
    <article className="flex flex-col gap-6 rounded-md shadow-md">
      <figure>
        <Image
          src={
            ProductImages[0]?.image.fileUrl ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          }
          height={360}
          width={400}
          alt="Product Image"
          className="w-full object-center rounded-md"
        />
      </figure>
      <div className="px-4 pb-6 flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-700 truncate">{name}</h3>
          <p className="text-sm text-gray-500">{categoryName}</p>
        </div>

        <p className="font-bold text-gray-900">${basePrice}</p>

        <p className="text-sm text-gray-700 font-semibold truncate">{about}</p>

        <Button className="self-end" asChild>
          <Link href={`/products/${slug}`}>
            <Eye />
            <span>View Details</span>
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
