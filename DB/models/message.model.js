import { Schema, Types, model } from 'mongoose'


const messageSchema = new Schema(
    {
        content:
        {
            type: String,
            required: true
        },
        receiverId: {
            type: Types.ObjectId,
            required: true
        }
    }, {
    timestamps: true
}
);


const messageModel = model('Message', messageSchema); //creating a table 

export default messageModel;