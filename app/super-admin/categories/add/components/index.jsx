"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { object, string } from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import FormError from "@/components/shared/Form/FormError";

export const categorySchema = object({
  name: string().required("Category Name is Required"),
  description: string().required("Category Description is Required"),
});

const SuperAdminCategoryAddModule = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      try {
        const { data } = await APIKit.categories.addCategory(values);

        toast.success("New Category created successfully!");

        router.push("/super-admin/categories");
      } catch (err) {
        console.log(err);
        toast.error(err.data?.message);
      }
    },
  });
  return (
    <div className="w-full max-w-2xl mx-auto my-6 bg-gray-50 py-10 px-6 md:px-10 lg:px-16 rounded-md shadow-lg">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1">
          <Label htmlFor="name">Category Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="User Category Name..."
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <FormError formik={formik} name="name" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Category Description</Label>
          <Input
            type="text"
            id="description"
            placeholder="User Last Name..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="description" />
        </div>

        <Button disabled={formik.isSubmitting} type="submit">
          {formik.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Please Wait
            </>
          ) : (
            "Add Category"
          )}
        </Button>
      </form>
    </div>
  );
};

export default SuperAdminCategoryAddModule;
