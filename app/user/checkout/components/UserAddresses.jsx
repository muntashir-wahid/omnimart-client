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
      console.log(firstSelectedAddressUid);

      formik.setFieldValue("addressUid", firstSelectedAddressUid);
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
              {address.isDefault || formik.values.addressUid === address.uid ? (
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
              {formik.values.addressUid !== address.uid ? (
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

      {/* 
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem> */}
    </Accordion>
  );
};

export default UserAddresses;
