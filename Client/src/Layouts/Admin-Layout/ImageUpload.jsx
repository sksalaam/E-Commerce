import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react"


const ImageUpload = ({imagefile, setImageFile, uploadedImageUrl, setUploadedImageUrl}) => {
    const inputRef = useRef(null);

    const handleImageFileChange =(event)=>{
     const imgFile = event.target.files?.[0];
     if(imgFile) setImageFile(imgFile)
    }
    const handleDrag = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    }
    const handleDrop = (event) => {
        event.preventDefault();
        const imgFile = event.dataTransfer.files[0];
        if(imgFile) setImageFile(imgFile)
    }
    const handleRemoveImg = () => {
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }
    async function uploadImageToCloudinary(){
        const data = new FormData();
        data.append('my_file', imagefile)
  
        const respone = await axios.post("http://localhost:3000/api/admin/products/upload-image", data)
        console.log("response.....",respone)
        if(respone?.data?.sucess)  setUploadedImageUrl(respone.data.result.url)
    }

    console.log("imagefile....",imagefile)
    useEffect(()=>{
        if(imagefile!==null) uploadImageToCloudinary()
    },[imagefile])

  return (
    <div className="width-full max-w-md mx-auto">
        <Label className="text-md mt-3 font-semibold mb-2 block ">Upload Image</Label>
        <div onDragOver={handleDrag} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
        <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange}/>
        {
            !imagefile?
           
           <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer" >
               <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
               <span>Choose an image</span>
           </Label>: <div className="flex justify-center items-center">
            <div className="flex items-center">
                <FileIcon className="w-8 h-8 mr-2 text-primary"/>
            </div>
            <p className="text-sm font-medium">{imagefile.name}</p>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImg}>
                <XIcon className="w-4 h-4"/>
                <span className="sr-only">Remove File</span>
            </Button> 
           </div>
        }
        </div>
    </div>
  )
}

export default ImageUpload
