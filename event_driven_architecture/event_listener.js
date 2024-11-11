const emitter=require("../emitter");
const AuthServices=require("../services/auth_services");


emitter.on('event_Type', async (eventType, data, callback) => {
    try {
        let response;
        switch (eventType) {
            case "createUser":
                response = await AuthServices.register(data);
                console.log("User Created:", response);
                callback(null, response);
                break;

            case "loginUser":
                response = await AuthServices.login(data);
                console.log("User Logged In:", response);
                callback(null, response);
                break;

            case "getProfile":
                response = await AuthServices.getProfile(data);
                console.log("User Profile:", response);
                callback(null, response);
                break;

            case "updateProfile":
                response = await AuthServices.updateProfile(data.data,data.userId);
                console.log("User Profile Updated:", response);
                callback(null, response);
                break;
            

    

            default:
                console.error("Invalid Event Type:", eventType);
                callback(new Error("Invalid event type"), null);
                return;
        }
    } catch (err) {
        console.error(`Error handling ${eventType}:`, err);
        callback(err, null);
    }
});