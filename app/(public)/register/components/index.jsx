"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { object, string } from "yup";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import FormError from "@/components/shared/Form/FormError";

const registerSchema = object({
  firstName: string().required("First Name is Required"),
  lastName: string().required("Last Name is Required"),
  phone: string().required("Phone Number is Required"),
  email: string().required("Email is Required").email("Use a valid email"),
  password: string()
    .required("Password is required")
    .min(6, "Password should be more then 6 characters"),
});

const RegisterModule = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, action) => {
      try {
        const { firstName, lastName, email, password, phone } = values;
        const { data } = await APIKit.auth.register(
          firstName,
          lastName,
          email,
          password,
          phone
        );

        console.log(data.data.user);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <section className="max-w-xl mx-auto my-10 border border-gray-300 rounded-xl pt-8 pb-16 px-10">
      <h1 className="text-center text-4xl font-bold mb-16">Please Login</h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="Your First Name..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="firstName" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="lastName">First Name</Label>
          <Input
            type="text"
            id="lastName"
            placeholder="Your Last Name..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="lastName" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Your Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Your Email..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="email" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Your Phone</Label>
          <Input
            type="tel"
            id="phone"
            placeholder="Your Phone..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="phone" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Your Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="XXXXXXXXX"
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="password" />
        </div>

        <Button type="submit">Register</Button>
      </form>

      <p className="mt-6">
        Already have an account?
        <Link className="ml-1 text-blue-500 underline" href="/login">
          Login
        </Link>
      </p>
    </section>
  );
};

export default RegisterModule;
