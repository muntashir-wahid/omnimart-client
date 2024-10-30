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
import { userRoles } from "../../../add/components";

export const statuses = [
  { label: "Active", value: "ACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Suspended", value: "SUSPENDED" },
];

export const userSchema = object({
  firstName: string().required("First Name is Required"),
  lastName: string().required("Last Name is Required"),
  phone: string().required("Phone Number is Required"),
});

const UserUpdateForm = ({ user }) => {
  const { firstName, lastName, email, phone, userRole, userStatus, uid } = user;
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
      phone,
      userRole,
      userStatus,
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await APIKit.users.updateUser(uid, values);

        router.push(`/super-admin/users/${data.user.uid}`);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-1">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          placeholder="User First Name..."
          onChange={formik.handleChange}
          value={formik.values.firstName}
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
          value={formik.values.lastName}
        />
        <FormError formik={formik} name="lastName" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          readOnly
          placeholder="User Email..."
          onChange={formik.handleChange}
          value={formik.values.email}
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
          value={formik.values.phone}
        />
        <FormError formik={formik} name="phone" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">User Role</Label>
        <Select
          value={formik.values.userRole}
          onValueChange={(selectedStatus) => {
            formik.setFieldValue("userRole", selectedStatus);
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

      <div className="space-y-1">
        <Label htmlFor="email">User Status</Label>
        <Select
          value={formik.values.userStatus}
          onValueChange={(selectedStatus) => {
            formik.setFieldValue("userStatus", selectedStatus);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Statuses</SelectLabel>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Update User</Button>
    </form>
  );
};

export default UserUpdateForm;
