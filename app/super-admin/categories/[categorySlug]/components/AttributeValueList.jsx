import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CollapsibleContent } from "@/components/ui/collapsible";

const values = {
  color: [
    { name: "Red", slug: "red" },
    { name: "Green", slug: "green" },
  ],
  size: [
    { name: "XL", slug: "xl" },
    { name: "XXL", slug: "xxl" },
  ],
  anything: [],
};

const AttributeValueList = ({ attributeUid }) => {
  return (
    <CollapsibleContent className="px-8 pb-4">
      <ul className="flex flex-col divide-y-[1px]">
        {/* {values[attributeSlug].map((item) => (
          <li
            key={item.slug}
            className="flex justify-between items-center py-4"
          >
            <span>{item.name}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Pencil />
              </Button>
              <Button variant="destructive" size="icon">
                <Trash2 />
              </Button>
            </div>
          </li>
        ))} */}
      </ul>
      <Button variant="link" className="self-start px-0 text-gray-600">
        <Plus />
        <span>Add New Value</span>
      </Button>
    </CollapsibleContent>
  );
};

export default AttributeValueList;
