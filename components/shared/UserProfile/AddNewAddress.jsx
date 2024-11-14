import { useFormik } from "formik";
import { number, object, string } from "yup";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import FormError from "@/components/shared/Form/FormError";
import SearchAndSelect from "../Form/SearchAndSelect";
import { useQuery } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";

const stockSchema = object({
  divisionId: number().required("Division is Required"),
  districtId: number().required("District is Required"),
  areaId: number().required("Area is Required"),
});

const createOptionsFromData = (
  dataList = [],
  labelTargetField = "name",
  valueTargetField = "id"
) => {
  return dataList.map((item, index) => ({
    label: item[labelTargetField],
    value: "" + item[valueTargetField],
  }));
};

const AddNewAddress = ({ openAddressAddModal, setOpenAddressAddModal }) => {
  const { data: divisions, isLoading: isDivisionsLoading } = useQuery({
    queryKey: ["divisions"],
    queryFn: APIKit.geoLocationsBD.getAllDivisions,
  });

  const formik = useFormik({
    initialValues: {
      divisionId: "",
      districtId: "",
      areaId: "",
    },
    validationSchema: stockSchema,
    onSubmit: async (values) => {
      try {
        // const { data } = await APIKit.inventory.stock.updateInventoryStock(
        //   inventoryUid,
        //   sku,
        //   values
        // );

        setOpenAddressAddModal(false);
        // refetchStock();
      } catch (err) {
        console.log(err);
      } finally {
        // formik.setFieldValue("price", 0);
        // formik.setFieldValue("stock", 0);
        // formik.setFieldValue("sku", "");
        // formik.setFieldValue("discount", 0);
      }
    },
  });

  const { data: districts, isLoading: isDistrictsLoading } = useQuery({
    queryKey: [`divisions/${formik.values.divisionId}/districts`],
    queryFn: () =>
      APIKit.geoLocationsBD.getAllDistrictsOnDivision(formik.values.divisionId),

    enabled: !!formik.values.divisionId,
  });

  const { data: regions, isLoading: isRegionsLoading } = useQuery({
    queryKey: [`districts/${formik.values.districtId}/regions`],
    queryFn: () =>
      APIKit.geoLocationsBD.getAllAreasOnDistrict(formik.values.districtId),

    enabled: !!formik.values.districtId,
  });

  if (isDivisionsLoading) {
    return <div>Loading data...</div>;
  }

  const divisionList = divisions?.data.divisions;
  const districtList = districts?.data.districts;
  const regionList = regions?.data.regions;

  return (
    <Dialog open={openAddressAddModal} onOpenChange={setOpenAddressAddModal}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="label">Address Label</Label>
              <Input
                type="text"
                id="label"
                name="label"
                placeholder="Your Address Label..."
                onChange={formik.handleChange}
                value={formik.values.label}
              />
              <FormError formik={formik} name="label" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="divisionId">Choose a Division</Label>
              <SearchAndSelect
                id="divisionId"
                placeholder="Select for Division"
                labelText="Select a Division"
                options={createOptionsFromData(divisionList)}
                onChange={(selectedValue) =>
                  formik.setFieldValue("divisionId", selectedValue)
                }
                value={formik.values.divisionId}
              />
              <FormError formik={formik} name="divisionId" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="districtId">Choose a District</Label>
              <SearchAndSelect
                id="districtId"
                placeholder="Select for District"
                labelText="Select a District"
                options={createOptionsFromData(districtList)}
                onChange={(selectedValue) =>
                  formik.setFieldValue("districtId", selectedValue)
                }
                value={formik.values.districtId}
              />
              <FormError formik={formik} name="districtId" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="areaId">Choose a Upazila/Area</Label>
              <SearchAndSelect
                id="areaId"
                placeholder="Select for Area"
                labelText="Select a Area"
                options={createOptionsFromData(regionList)}
                onChange={(selectedValue) =>
                  formik.setFieldValue("areaId", selectedValue)
                }
                value={formik.values.areaId}
              />
              <FormError formik={formik} name="areaId" />
            </div>

            <div className="space-y-1 col-span-2">
              <Label htmlFor="addressLine">Address Line</Label>
              <Textarea
                name="addressLine"
                id="addressLine"
                placeholder="Product short description..."
                onChange={formik.handleChange}
                value={formik.values.addressLine}
              />
              <FormError formik={formik} name="addressLine" />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewAddress;
