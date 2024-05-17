import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    gender:
    {
        type: String,
        enum: ['Male', 'Female'],
    },
    profilePic:{
        type:String
    }

},
    {
        timestamps: true
    });

const userModel = model('User', userSchema); //creating a table 

export default userModel;