// Import the multer library, which is used for handling multipart/form-data (primarily file uploads)

import multer from "multer";

// Define a storage engine using multer's diskStorage method.
// This allows customization of how and where files are stored on disk.
const storage = multer.diskStorage({
    // The 'filename' function determines the name of the file saved on disk.
    // It receives the request object, the uploaded file object, and a callback.

    filename:function(req, file, callback){
        // Use the original name of the uploaded file as the filename on disk.
        // This may cause overwriting if multiple files have the same name.

        callback(null,file.originalname)
    }
});
// Create an instance of multer with the defined storage configuration.
// This middleware can now be used to handle file uploads in routes
const upload = multer({storage});

// Export the configured upload middleware so it can be used in other modules (e.g., route handlers).

export default upload 