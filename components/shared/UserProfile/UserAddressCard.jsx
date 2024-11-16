import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserAddressCard = ({
  addressData: {
    uid,
    isDefault,
    label,
    address: { addressLine, district, division, dhakaCity, upazila },
  },
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <h5>{label}</h5>
          <Button variant="outline" size="icon">
            <PencilLine className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <address className="text-gray-600">
          {addressLine}, {dhakaCity ? dhakaCity.name : upazila.name},{" "}
          {district.name}, {division.name}
        </address>
      </CardContent>
    </Card>
  );
};

export default UserAddressCard;
