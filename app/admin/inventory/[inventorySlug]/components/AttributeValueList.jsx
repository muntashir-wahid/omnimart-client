import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";

import { SelectGroup, SelectItem } from "@/components/ui/select";

const AttributeValueList = ({ attributeUid }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`attributes/${attributeUid}/values`],
    queryFn: () =>
      APIKit.categories.attributes.values.getAttributeValues(attributeUid),
  });

  return (
    <SelectGroup>
      {isLoading ? (
        <SelectItem>Loading...</SelectItem>
      ) : (
        <>
          {data.data.values.map((value) => (
            <SelectItem key={value.uid} value={value.uid}>
              {value.name}
            </SelectItem>
          ))}
        </>
      )}
    </SelectGroup>
  );
};

export default AttributeValueList;
