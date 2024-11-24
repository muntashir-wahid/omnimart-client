"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { mixed, number, object, string } from "yup";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import FormError from "@/components/shared/Form/FormError";

const productSchema = object({
  name: string().required("Product Name is Required"),
  basePrice: number()
    .required("Base Price is Required")
    .min(1, "Price must be more then 0"),
  about: string().required("Product About is Required"),
  categoryUid: string().required("Product Category is Required"),
  image: mixed().required("Image is Required"),
});

const AdminAddInventoryModule = () => {
  const router = useRouter();

  const { data: categoryList, isLoading: isCategoryListLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: APIKit.categories.getAllCategories,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      basePrice: "",
      about: "",
      categoryUid: "",
      image: null,
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      Object.keys(values).forEach((keyName) => {
        formData.append(keyName, values[keyName]);
      });

      try {
        const { data } = await APIKit.inventory.addInventory(formData);

        toast.success("New inventory created successfully");
        router.push(`/admin/inventory/${data.inventory.slug}`);
      } catch (err) {
        const message =
          err.data?.message || "Something went wrong. Please try again.";
        toast.success(message);
        console.log(err);
      }
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto my-6 bg-gray-50 py-10 px-6 md:px-10 lg:px-16 rounded-md shadow-lg">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1">
          <Label htmlFor="name">Product Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="User Product Name..."
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <FormError formik={formik} name="name" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="basePrice">Base Price</Label>
          <Input
            type="number"
            id="basePrice"
            placeholder="Base Price..."
            onChange={formik.handleChange}
            value={formik.values.basePrice}
          />
          <FormError formik={formik} name="basePrice" />
        </div>

        {/* Category Selection Dropdown */}
        <div className="space-y-1">
          <Label htmlFor="email">Category</Label>
          <Select
            value={formik.values.categoryUid}
            onValueChange={(selectedCategory) => {
              formik.setFieldValue("categoryUid", selectedCategory);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category List</SelectLabel>
                {isCategoryListLoading ? (
                  <SelectItem>Loading...</SelectItem>
                ) : (
                  <>
                    {categoryList.data.categories.map((category) => (
                      <SelectItem key={category.uid} value={category.uid}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormError formik={formik} name="categoryUid" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="about">About</Label>
          <Textarea
            name="about"
            id="about"
            placeholder="Product short description..."
            onChange={formik.handleChange}
            value={formik.values.about}
          />
          <FormError formik={formik} name="about" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="image">Upload an Image</Label>
          <Input
            type="file"
            id="image"
            placeholder="Choose an image"
            onChange={(event) => {
              formik.setFieldValue("image", event.target.files[0]);
            }}
            accept="image/png, image/gif, image/jpeg"
          />
          <FormError formik={formik} name="image" />
        </div>

        <Button disabled={formik.isSubmitting} type="submit">
          {formik.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Please Wait
            </>
          ) : (
            "Add New Inventory"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AdminAddInventoryModule;
