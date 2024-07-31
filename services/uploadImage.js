var cloudinary = require("cloudinary").v2;

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dba0qjfeo', 
        api_key: '483868386424955', 
        api_secret: 'Yi6UwgxL213LtudtiwIMZjgWQe8' // Click 'View Credentials' below to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();
// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto",
// };

// const uploadImage = (image) => {
//   //imgage = > base64
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(image, opts, (error, result) => {
//       if (result && result.secure_url) {
//         console.log(result.secure_url);
//         return resolve(result.secure_url);
//       }
//       console.log(error.message);
//       return reject({ message: error.message });
//     });
//   });
// };
// module.exports = (image) => {
//   //imgage = > base64
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(image, opts, (error, result) => {
//       if (result && result.secure_url) {
//         console.log(result.secure_url);
//         return resolve(result.secure_url);
//       }
//       console.log(error.message);
//       return reject({ message: error.message });
//     });
//   });
// };

// // module.exports.uploadMultipleImages = (images) => {
// //   return new Promise((resolve, reject) => {
// //     const uploads = images.map((base) => uploadImage(base));
// //     Promise.all(uploads)
// //       .then((values) => resolve(values))
// //       .catch((err) => reject(err));
// //   });
// // };
