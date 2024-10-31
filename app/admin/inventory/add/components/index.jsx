"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { number, object, string } from "yup";

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

import FormError from "@/components/shared/Form/FormError";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";

export const productSchema = object({
  name: string().required("Product Name is Required"),
  basePrice: number()
    .required("Base Price is Required")
    .min(1, "Price must be more then 0"),
  about: string().required("Product About is Required"),
  categoryUid: string().required("Product Category is Required"),
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
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await APIKit.inventory.addInventory(values);

        router.push(`/admin/inventory/${data.inventory.slug}`);
      } catch (err) {
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
          <Label htmlFor="email">User Role</Label>
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

        <Button type="submit">Add Inventory</Button>
      </form>
    </div>
  );
};

export default AdminAddInventoryModule;
