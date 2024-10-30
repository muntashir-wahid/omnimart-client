"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";

import APIKit from "@/lib/apiKit";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";

import AddNewAttribute from "./AddNewAttribute";
import AttributeValueList from "./AttributeValueList";
import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import { Badge } from "@/components/ui/badge";

// const attributes = [
//   { name: "Color", slug: "color" },
//   { name: "Size", slug: "size" },
//   { name: "Anything", slug: "anything" },
// ];

const AttributeList = ({ categoryUid }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`categories/${categoryUid}/attributes`],
    queryFn: () =>
      APIKit.categories.attributes.getAllCategoryAttributes(categoryUid),
  });

  if (isLoading) {
    return (
      <DataLoadingState
        extraClassNames=""
        content="Category Attributes is Loading..."
      />
    );
  }

  const attributes = data.data.attributes;

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto my-6 bg-gray-50 divide-y-2">
      {attributes?.map((attribute) => (
        <Collapsible key={attribute.uid}>
          <CollapsibleTrigger className="w-full text-left px-6 py-4 flex items-center justify-between">
            <h5 className="text-lg font-bold">
              <span>{attribute.name} </span>
              <Badge variant="outline" className="capitalize">
                {attribute.attributeStatus.toLowerCase()}
              </Badge>
            </h5>
            <ChevronDown />
          </CollapsibleTrigger>
          <AttributeValueList attributeUid={attribute.uid} />
        </Collapsible>
      ))}
      <AddNewAttribute categoryUid={categoryUid} refetchAttributes={refetch} />
    </div>
  );
};

export default AttributeList;
