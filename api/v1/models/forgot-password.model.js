const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
{
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 3
    }
},
    {timestamps: true }
);
const ForgotPassword = mongoose.model("Forgot Password", forgotPasswordSchema, "forgot-password");
module.exports = ForgotPassword;