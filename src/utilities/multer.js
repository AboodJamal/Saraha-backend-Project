import multer from "multer";
import { nanoid } from "nanoid";


function fileUpload() {
    const myStorage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            //cb(null,Date.now()+Math.random()+"_"+ file.originalname);// making the name of the file unique
            // or we can use nanoId (unique ID generator)
            cb(null,Date.now()+nanoid()+ file.originalname);
        }
    });

    function myFileFilter(req,file,cb){
        if(['image/jpeg', 'image/svg+xml', 'image/gif', 'image/png'].includes(file.mimetype))// same as if(file.mimetype=="image/jpeg" || file.mimetype=="image/svg+xml"||file.mimetype=="image/gif"||file.mimetype=="image/png") 
        {
            cb(null, true); 
        }
        else {
            cb("invalid format bro", false);
        }
    }

    const upload = multer({ fileFilter:myFileFilter, storage: myStorage });
    return upload;
}

export default fileUpload;