import CommmonForm from "@/Components/Common/Form"
import { Button } from "@/Components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/Components/ui/sheet"
import { addProductFormElements } from "@/Config"
import ImageUpload from "@/Layouts/Admin-Layout/ImageUpload"
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
  const [imagefile, setImageFile] = useState(null);  
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const onSubmit = () => {

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
          <ImageUpload imagefile={imagefile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}/>  
          <div className="py-5">
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
