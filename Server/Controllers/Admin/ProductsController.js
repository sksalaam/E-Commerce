const { imageUploadUtil } = require("../../Helpers/Cloudinary");

const handleImageUpload = async(req, res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(url);

        res.json({
            success : true,
            result,
        })
    } catch (error) {
        
        console.error("Upload Error:", error.message || error); // Log the error message
        res.status(500).json({
            success: false,
            message: "Image upload failed",
            error: error.message || "Unknown error",
        });
        
    }
}

module.exports = {handleImageUpload}