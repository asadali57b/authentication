const userModel=require('../models/auth_models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const redisClient=require('../redisClient');
const Secret_key= "userData";
const {successResponse,errorResponse}=require('../middleware/helper')
const mongoose=require('mongoose');



class AuthServices {
    async register(data) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword;

            const userData = new userModel(data);
            const savedUser = await userData.save();

            if (savedUser) {
                console.log("USER SAVED:", savedUser);
                return successResponse(savedUser,"200")
            }
            return errorResponse("400", "Something went wrong");

        } catch (err) {
            console.log("Error in register:", err);
            return errorResponse("500",`${err}`);
        }
    }
    async login(data) {
        try {
           const user=await userModel.findOne({email:data.email});
           if(!user||!(await bcrypt.compare(data.password,user.password))){
               return errorResponse("400","Invalid Email or Password");
           };
           const token=jwt.sign({id:user._id},Secret_key,{expiresIn:"1h"});
           user.token=token;
           await user.save();
           
           return successResponse(user,"200");
           
        //    if (redisClient.isOpen) {
        //     await redisClient.setEx(user._id.toString(), 3600, token); // Cache token in Redis for 1 hour
        // } else {
        //     console.warn("Redis client is not open; token not cached.");
        // }           return successResponse(token,"200")

    
        } catch (err) {
            console.log("Error in login:", err);
            return errorResponse("500", "Server error");
        }
    }
    async getProfile(userId) {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                return errorResponse("404", "User not found");
            }
            return successResponse(user, "200");
        } catch (err) {
            console.log("Error in getProfile:", err);
            return errorResponse("500", "Server error");
        }
    }
       async updateProfile(userId, data) {
        try {
            // Validate userId format
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return errorResponse("400", "Invalid User ID format");
            }
    
            // Find user by valid userId
            const user = await userModel.findById(userId);
            if (!user) {
                return errorResponse("404", "User not found");
            }
    
            // Update user fields
            user.username = data.username || user.username;
            user.email = data.email || user.email;
            user.mobile = data.mobile || user.mobile;
            user.gender = data.gender || user.gender;
            user.dob = data.dob || user.dob;
    
            if (data.photo) {
                user.photo = data.photo;  // Store the filename of the uploaded photo
            }
    
            await user.save();
            return successResponse(user, "200");
        } catch (err) {
            console.log("Error in updateProfile:", err);
            return errorResponse("500", "Server error");
        }
    }
}

module.exports = new AuthServices();
