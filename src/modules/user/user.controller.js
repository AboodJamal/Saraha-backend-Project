import userModel from "../../../DB/models/user.model.js";

export const profile = async (req,res)=>
{
    const user =  await userModel.findById(req.authUser._id); // the authUser that comes from the checkAuth middleware
    return res.json({profileInfo:user});
};


export const uploadImage = async (req,res)=>
{
    const imageUrl= req.file.destination + "/" + req.file.filename;
    const user = await userModel.findByIdAndUpdate(req.authUser._id,{profilePic:imageUrl},{new:true})
    return res.json(user);
}