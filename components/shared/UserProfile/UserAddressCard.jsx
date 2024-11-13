import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserAddressCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <h5>Default Address</h5>
          <Button variant="outline" size="icon">
            <PencilLine className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Block: C, House: 36, New Market, Jashore.</p>
      </CardContent>
    </Card>
  );
};

export default UserAddressCard;
