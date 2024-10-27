"use client";

import { useFormik } from "formik";
import { object, string } from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormError from "@/components/shared/Form/FormError";

const loginSchema = object({
  email: string().required("Email is Required").email("Use a valid email"),
  password: string()
    .required("Password is required")
    .min(6, "Password should be more then 6 characters"),
});

const LoginModule = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => {
      console.log(values);
    },
  });

  return (
    <section className="max-w-xl mx-auto my-10 border border-gray-300 rounded-xl pt-8 pb-16 px-10">
      <h1 className="text-center text-4xl font-bold mb-20">Please Login</h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-1">
          <Label htmlFor="email">Your Email</Label>
          <Input
            type="text"
            id="email"
            label="Email"
            placeholder="Your Email..."
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="email" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Your Password</Label>
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="XXXXXXXXX"
            onChange={formik.handleChange}
          />
          <FormError formik={formik} name="password" />
        </div>

        <Button type="submit">Login</Button>
      </form>
    </section>
  );
};

export default LoginModule;
