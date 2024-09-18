import CommmonForm from "@/Components/Common/Form"
import { Button } from "@/Components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/Components/ui/sheet"
import { addProductFormElements } from "@/Config"
import { Fragment, useState } from "react"

const initialFormData = {
  image : null,
  title : "",
  description:'',
  category:'',
  brand : "",
  price : '',
  salePrice : '',
  totalStock : '',

}
const Products = () => {

  const [openCreateProductDialog, setOpenCreateProductDialog]= useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const onSubmit = (event) => {

  }

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={()=> setOpenCreateProductDialog(true)}>Add New Product</Button>
      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=> {
        setOpenCreateProductDialog(false);
      }}>
         <SheetContent side="right" className="overflow-auto" >
          <SheetHeader>
            <SheetTitle>
              Add New Product
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
             <CommmonForm
             formData={formData}
             setFormData={setFormData}
             buttonText='Add'
             formControls={addProductFormElements}
             onSubmit={onSubmit}
             />
          </div>
         </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default Products
