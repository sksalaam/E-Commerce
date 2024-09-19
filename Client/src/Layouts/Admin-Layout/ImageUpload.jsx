import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { UploadCloudIcon } from "lucide-react";
import { useRef } from "react"


const ImageUpload = ({imagefile, setImageFile, uploadedImageUrl, setUploadedImageUrl}) => {
    const inputRef = useRef(null);
    const handleImageFileChange =(event)=>{
     const imgFile = event.target.file?.[0];
     if(imgFile) setImageFile(imgFile)
    }
  return (
    <div className="width-full max-w-md mx-auto">
        <Label className="text-md mt-3 font-semibold mb-2 block ">Upload Image</Label>
        <div className="">
        <Input id="image-upload" type="file" className="hidden" ref={inputRef} onChange={handleImageFileChange}/>
        {
            !imagefile?
           
           <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer" >
               <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
               <span>Choose an image</span>
           </Label>: <div></div>
        }
        </div>
    </div>
  )
}

export default ImageUpload
