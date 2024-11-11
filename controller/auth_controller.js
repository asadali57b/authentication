const AuthServices=require('../services/auth_services');
const emitter=require('../emitter');
const  {registerSchema, loginSchema }  =require('../utils/validation');
const mongoose=require('mongoose');



class AuthController {
    async register(req, res) {
        const { username, password, email, mobile, gender, dob } = req.body;
    
        try {
            const { error } = registerSchema.validate(req.body);
            
            emitter.emit("event_Type", "createUser", req.body, (err, data) => {
                if (err) {
                    console.error("Error in user created event listener:", err);
                    return res.status(500).json({ "STATUS": "ERROR", "message": err.message });
                }

                res.status(200).json(data);
            });
        } catch (err) {
            console.error("Error in register controller:", err);
            res.status(500).json({ "STATUS": "ERROR", "message": "Server error" });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const { error } = loginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ "STATUS": "ERROR", "message": error.details[0].message });
            }

            emitter.emit("event_Type", "loginUser", req.body, (err, data) => {
                if (err) {
                    console.error("Error in user login event listener:", err);
                    return res.status(500).json({ "STATUS": "ERROR", "message": err.message });
                }

                res.status(200).json(data);
            });
        } catch (err) {
            console.error("Error in login controller:", err);
            res.status(500).json({ "STATUS": "ERROR", "message": "Server error" });
        }
    }
    async getProfile(req, res) {
        const userId = req.params.id;
    
        try {
            if (!userId) {
                return res.status(400).json({ "STATUS": "ERROR", "message": "User ID is required" });
            }
            // const profile = await 
            // AuthServices.getProfile(userId);
            // res.status(200).json(profile);

            emitter.emit("event_Type", "getProfile", userId, (err, data) => {
                if (err) {
                    console.error("Error in user profile event listener:", err);
                    return res.status(500).json({ "STATUS": "ERROR", "message": err.message });
                }

                res.status(200).json(data);
            });
        } catch (err) {
            console.error("Error in getProfile controller:", err);
            res.status(500).json({ "STATUS": "ERROR", "message": "Server error" });
        }
    }
    //     }
    // }
    async updateProfile(req, res) {
        const userId = req.params.id; // Ensure userId is passed as part of the request URL
        console.log("Received userId:", userId);  // Log userId for debugging
    
        const photo = req.file ? req.file.filename : null;
        const { username, email, mobile } = req.body;
    
        // Ensure that userId is valid before emitting the event
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ "STATUS": "ERROR", "message": "Invalid User ID format" });
        }
    
        // Proceed with the logic to update profile
        emitter.emit("event_Type", "updateProfile", { userId, data: req.body }, (err, data) => {
            if (err) {
                console.error("Error in user profile update event listener:", err);
                return res.status(500).json({ "STATUS": "ERROR", "message": err.message });
            }
            res.status(200).json(data);
        });
    }
    

}

module.exports = new AuthController();