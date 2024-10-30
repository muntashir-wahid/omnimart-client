"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { object, string } from "yup";

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

export const userSchema = object({
  firstName: string().required("First Name is Required"),
  lastName: string().required("Last Name is Required"),
  phone: string().required("Phone Number is Required"),
  email: string().required("Email is Required").email("Use a valid email"),
  password: string()
    .required("Password is required")
    .min(6, "Password should be more then 6 characters"),
});

export const userRoles = [
  { label: "User", value: "USER" },
  { label: "Admin", value: "ADMIN" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
];

const SuperAdminAddUserModule = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      userRole: "USER",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await APIKit.users.addUser(values);

        router.push("/super-admin/users");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto my-6 bg-gray-50 py-10 px-6 md:px-10 lg:px-16 rounded-md shadow-lg">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="User First Name..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="firstName" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            placeholder="User Last Name..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="lastName" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="User Email..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="email" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            id="phone"
            placeholder="User Phone..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="phone" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="XXXXXXXXX"
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="password" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">User Role</Label>
          <Select
            value={formik.values.userRole}
            onValueChange={(selectedRole) => {
              formik.setFieldValue("userRole", selectedRole);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                {userRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit">Add User</Button>
      </form>
    </div>
  );
};

export default SuperAdminAddUserModule;
