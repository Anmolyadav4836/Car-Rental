import User from "../models/User.js";

//API to change user role to owner
export const changeRoleToOwner = async (req,res)=>{
    try{
        const {_id} = req.user;
        const user = await User.findById(_id);
        user.role = 'owner';
        await user.save();
        return res.status(200).json({success:true,message:'User role changed to owner'})
        
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in changing user role'})
    }
}

