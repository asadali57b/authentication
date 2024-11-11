
const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    password:{type:String,required:true},
    token:{type:String},
    photo: { type: String }, 

    
});

module.exports = mongoose.model('Data', UserSchema);
