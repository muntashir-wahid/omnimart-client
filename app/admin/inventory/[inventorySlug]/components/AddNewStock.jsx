import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
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
import AttributeSelectionsList from "./AttributeSelectionsList";

const stockSchema = object({
  sku: string().required("sku is Required"),
  price: number()
    .required("Price is Required")
    .min(1, "Price must be more then 0"),
  stock: number()
    .required("Stock is Required")
    .min(0, "Stock must be more then 0"),
  discount: number()
    .required("Discount is Required")
    .min(0, "Discount must be more then 0"),
});

const AddNewStock = ({
  inventoryUid,
  basePrice,
  categoryUid,
  openStockAddModal,
  setOpenStockAddModal,
  refetchStock,
}) => {
  const { data: attributeList, isLoading: isAttributeListLoading } = useQuery({
    queryKey: [`categories/${categoryUid}/attributes`],
    queryFn: () =>
      APIKit.categories.attributes.getAllCategoryAttributes(categoryUid),
  });

  const formik = useFormik({
    initialValues: {
      sku: "",
      price: basePrice,
      stock: 0,
      discount: 0,
      productAttributeList: {},
    },
    validationSchema: stockSchema,
    onSubmit: async (values) => {
      try {
        const newStock = {
          price: values.price,
          stock: values.stock,
          sku: values.sku,
          discount: values.discount,
          attributes: Object.values(values.productAttributeList),
        };

        const { data } = await APIKit.inventory.stock.addInventoryStock(
          inventoryUid,
          newStock
        );

        setOpenStockAddModal(false);
        refetchStock();
      } catch (err) {
        console.log(err);
      } finally {
        formik.setFieldValue("price", basePrice);
        formik.setFieldValue("stock", 0);
        formik.setFieldValue("sku", "");
        formik.setFieldValue("discount", 0);
        formik.setFieldValue("productAttributeList", {});
      }
    },
  });

  return (
    <Dialog open={openStockAddModal} onOpenChange={setOpenStockAddModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Stock</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="sku">SKU</Label>
              <Input
                type="text"
                id="sku"
                placeholder="sku-12522dd..."
                onChange={formik.handleChange}
                value={formik.values.sku}
              />
              <FormError formik={formik} name="sku" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                placeholder="Price..."
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              <FormError formik={formik} name="price" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="stock">Stock</Label>
              <Input
                type="number"
                id="stock"
                placeholder="Stock..."
                onChange={formik.handleChange}
                value={formik.values.stock}
              />
              <FormError formik={formik} name="stock" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="discount">Discount(%)</Label>
              <Input
                type="number"
                id="discount"
                placeholder="Discount..."
                onChange={formik.handleChange}
                value={formik.values.discount}
              />
              <FormError formik={formik} name="discount" />
            </div>

            {!isAttributeListLoading && (
              <AttributeSelectionsList
                attributeList={attributeList.data.attributes}
                formik={formik}
              />
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewStock;
