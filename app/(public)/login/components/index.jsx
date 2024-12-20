"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { object, string } from "yup";

import APIKit from "@/lib/apiKit";
import { userRedirectionHandler } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import FormError from "@/components/shared/Form/FormError";
import { setCurrentUser } from "@/store/features/currentUser/currentUser";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const loginSchema = object({
  email: string().required("Email is Required").email("Use a valid email"),
  password: string()
    .required("Password is required")
    .min(6, "Password should be more then 6 characters"),
});

const LoginModule = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const { data } = await APIKit.auth.login(email, password);
        dispatch(setCurrentUser(data.user));
        userRedirectionHandler(data.user.userRole, router);
        toast.success("You are successfully logged in!");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    },
  });

  return (
    <section className="max-w-xl mx-auto my-10 border border-gray-300 rounded-xl pt-8 pb-16 px-10">
      <h1 className="text-center text-4xl font-bold mb-16">Please Login</h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-1">
          <Label htmlFor="email">Your Email</Label>
          <Input
            type="email"
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

        <Button disabled={formik.isSubmitting} type="submit">
          {formik.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Please Wait
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <p className="mt-6">
        Don't have an account?
        <Link className="ml-1 text-blue-500 underline" href="/register">
          Register
        </Link>
      </p>
    </section>
  );
};

export default LoginModule;
