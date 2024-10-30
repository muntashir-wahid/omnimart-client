"use client";

import { ChevronDown } from "lucide-react";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";

import AttributeValueList from "./AttributeValueList";
import AddNewAttribute from "./AddNewAttribute";

const attributes = [
  { name: "Color", slug: "color" },
  { name: "Size", slug: "size" },
];

const AttributeList = () => {
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto my-6 bg-gray-50 divide-y-2">
      {attributes.map((attribute) => (
        <Collapsible key={attribute.slug}>
          <CollapsibleTrigger className="w-full text-left px-6 py-4 flex items-center justify-between">
            <h5 className="text-lg font-bold">{attribute.name}</h5>
            <ChevronDown />
          </CollapsibleTrigger>
          <AttributeValueList attributeSlug={attribute.slug} />
        </Collapsible>
      ))}
      <AddNewAttribute />
    </div>
  );
};

export default AttributeList;
