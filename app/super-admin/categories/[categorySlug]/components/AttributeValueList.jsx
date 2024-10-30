import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";
import { CollapsibleContent } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const AttributeValueList = ({ attributeUid }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`attributes/${attributeUid}/values`],
    queryFn: () =>
      APIKit.categories.attributes.values.getAttributeValues(attributeUid),
  });

  const handleAttributeAdd = async () => {
    try {
      await APIKit.categories.attributes.values.addAttributeValue(
        attributeUid,
        {
          name,
        }
      );
      refetch();
      setOpen(false);
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return "Loading...";
  }

  const values = data.data.values;

  return (
    <CollapsibleContent className="px-8 pb-4">
      <ul className="flex flex-col divide-y-[1px]">
        {values.map((item) => (
          <li key={item.uid} className="flex justify-between items-center py-4">
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
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="self-start px-0 text-gray-600">
            <Plus />
            <span>Add New Value</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Value</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name..."
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="button" onClick={handleAttributeAdd}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CollapsibleContent>
  );
};

export default AttributeValueList;
