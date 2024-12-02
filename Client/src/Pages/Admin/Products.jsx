import AdminProductTile from "@/Layouts/Admin-Layout/Product-tile"
import CommmonForm from "@/Components/Common/Form"
import { Button } from "@/Components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/Components/ui/sheet"
import { addProductFormElements } from "@/Config"
import { toast } from "@/hooks/use-toast"
import ImageUpload from "@/Layouts/Admin-Layout/ImageUpload"
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/Store/Admin/Products-Slice"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

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
  const [imageLoading, setImageLoading] = useState(false);
  const {productList} = useSelector(state => state.adminProducts)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const  dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !==null ?
    dispatch(editProduct({
      id: currentEditedId, formData
    })).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setCurrentEditedId(null)
        toast({
          title: 'Product updated successfully!'
        })
        setOpenCreateProductDialog(false);
      }else{
        toast({
          title: 'Something went wrong!',
          variant: "destructive",
          duration: 5000,
        })
      }
    }):
    dispatch(addNewProduct({
      ...formData,
      image : uploadedImageUrl
    })).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setOpenCreateProductDialog(false)
        setImageFile(null);
        setFormData(initialFormData)
        toast({
          title: 'Product added successfully!'
        })
        setOpenCreateProductDialog(false);
        dispatch(fetchAllProducts())
      }else{
        toast({
          title: 'Something went wrong!',
          variant: "destructive",
          duration: 5000,
        })
      }
    })
  }
  const isValid =()=>{
    return Object.keys(formData)
    .map((key)=> formData[key] !== "")
    .every((item)=>item);
  }
  const handleDelete =(getCurrentProductId)=>{
   dispatch(deleteProduct(getCurrentProductId)).then((data) => {
    if(data?.payload?.success){
      toast({
        title: 'Product deleted!',
      })
      dispatch(fetchAllProducts())
    }else{
      toast({
        title: 'Something went wrong!',
        variant: "destructive",
        duration: 5000,
      })
    }
   })
  }
  useEffect((  
  ) =>{dispatch(fetchAllProducts())

  }, [dispatch])
  console.log(productList, 'products')
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={()=> setOpenCreateProductDialog(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
          productList.map(productItem => 
          <AdminProductTile 
          product={productItem} 
          currentEditedId ={currentEditedId} 
          setCurrentEditedId={setCurrentEditedId} 
          setOpenCreateProductsDialog={setOpenCreateProductDialog}
          setFormData={setFormData}
          handleDelete={handleDelete}
          />) : null
        }
      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=> {
        setOpenCreateProductDialog(false);
        setCurrentEditedId(null)
        setFormData(initialFormData)
      }}>
         <SheetContent side="right" className="overflow-auto" >
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null? 'Edit Product' : 'Add New Product'
              }
            </SheetTitle>
          </SheetHeader>
          <ImageUpload 
          imageFile={imagefile} 
          setImageFile={setImageFile} 
          uploadedImageUrl={uploadedImageUrl} 
          setUploadedImageUrl={setUploadedImageUrl}
          imageLoadingState={imageLoading}
          setImageLoadingState={setImageLoading}
          isEditMode={currentEditedId}         
          />  
          <div className="py-5">
             <CommmonForm
             formData={formData}
             setFormData={setFormData}
             buttonText={
              currentEditedId!== null? 'Update' : 'Add'
             }
             formControls={addProductFormElements} 
             onSubmit={onSubmit}
             isBtnDisabled={!isValid()}
             />
          </div>
         </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default Products
