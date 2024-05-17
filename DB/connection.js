import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("connected");
    } catch (err) {
        // return res.json({ error: err });
        console.log("error: ", err);
    }

};

/*
const connectDBf = async () => {
    return mongoose.connect(`mongodb://localhost:27017/node5`)
        .then(result => {
            console.log(`connected`)
        }).catch(err => {
            console.log(`error to connect db ${err}`);
        })
}
*/



export default connectDB;