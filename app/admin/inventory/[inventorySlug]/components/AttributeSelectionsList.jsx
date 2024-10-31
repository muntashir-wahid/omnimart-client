import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AttributeValueList from "./AttributeValueList";

const AttributeSelectionsList = ({ formik, attributeList }) => {
  return (
    <>
      {attributeList.map((attribute) => (
        <div key={attribute.uid} className="space-y-1">
          <Label>{attribute.name}</Label>
          <Select
            value={formik.values.productAttributeList[attribute.name]}
            onValueChange={(selectedCategory) => {
              const attributeName = attribute.name;
              formik.setFieldValue(
                `productAttributeList.${attributeName}`,
                selectedCategory
              );
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Choose a ${attribute.name}`} />
            </SelectTrigger>
            <SelectContent>
              <AttributeValueList attributeUid={attribute.uid} />
            </SelectContent>
          </Select>
        </div>
      ))}
    </>
  );
};

export default AttributeSelectionsList;
