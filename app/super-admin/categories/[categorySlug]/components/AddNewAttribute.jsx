import { useState } from "react";
import { Plus } from "lucide-react";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddNewAttribute = ({ categoryUid, refetchAttributes }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleAttributeAdd = async () => {
    try {
      await APIKit.categories.attributes.addCategoryAttribute(categoryUid, {
        name,
        productCategoriesUid: categoryUid,
      });
      refetchAttributes();
      setOpen(false);
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2 py-6">
          <Plus />
          <span>Add New Attribute</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crate a New Attribute</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name">New Attribute Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="New Attribute Name..."
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
  );
};

export default AddNewAttribute;
