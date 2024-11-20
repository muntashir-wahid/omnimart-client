import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const UserAddresses = ({ formik }) => {
  const { data: userAddresses, isLoading: isUserAddressesLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: APIKit.users.addresses.getAllAddresses,
  });

  useEffect(() => {
    if (!isUserAddressesLoading) {
      const defaultAddressUid = userAddresses.data.addresses.find(
        (address) => address.isDefault
      );

      const firstSelectedAddressUid =
        defaultAddressUid || userAddresses.data.addresses[0].uid;

      formik.setFieldValue("userAddressUid", firstSelectedAddressUid);
    }
  }, [isUserAddressesLoading]);

  if (isUserAddressesLoading) {
    return <div>Addresses Loading...</div>;
  }

  const { addresses } = userAddresses.data;

  return (
    <Accordion type="single" collapsible className="w-full">
      {addresses.map((address) => (
        <AccordionItem key={address.uid} value={address.uid}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p>{address.label}</p>
              {address.isDefault ||
              formik.values.userAddressUid === address.uid ? (
                <CheckCircle size={16} className="text-green-500" />
              ) : null}
            </div>
            <AccordionTrigger />
          </div>
          <AccordionContent>
            <address>
              {address.address.addressLine},{" "}
              {address.address.dhakaCity
                ? address.address.dhakaCity.name
                : address.address.upazila.name}
              , {address.address.district.name}, {address.address.division.name}
              {formik.values.userAddressUid !== address.uid ? (
                <Button
                  onClick={() =>
                    formik.setFieldValue("addressUid", address.uid)
                  }
                  className="text-blue-600"
                  variant="link"
                >
                  Select Address
                </Button>
              ) : null}
            </address>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default UserAddresses;
