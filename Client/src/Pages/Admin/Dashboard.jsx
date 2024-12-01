import { Button } from "@/Components/ui/button";
import { toast } from "@/hooks/use-toast"
import ImageUpload from "@/Layouts/Admin-Layout/ImageUpload";
import { addFeatureImage, deleteFeatureImageThunk, getFeatureImages } from "@/Store/Common/Image-Slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function Dashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);



  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast({
          title: "Feature Image is uploaded successfully",
        });
      }
    });
  }

  function deleteFeatureImage (id){
    dispatch(deleteFeatureImageThunk(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        toast({
          title: "Feature Image is deleted successfully",
        });
      }
    })
  
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);



  return (
    <div>
      <h2 className=" font-semibold text-2xl text-center">Upload Banner Images</h2>
      <ImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        
      />
      {
       imageFile && uploadedImageUrl ?  <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
       Upload
     </Button> : null
      }
      
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative mt-5 flex justify-center items-center">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Button onClick={()=>deleteFeatureImage(featureImgItem._id)} className ="mt-3">
                Delete
              </Button>
              </div>
              
            ))
          : null}
      </div>
    </div>
  );
}

export default Dashboard;