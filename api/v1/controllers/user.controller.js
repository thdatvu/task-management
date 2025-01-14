const md5 = require("md5");
const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");
const generateHelper = require("../../../helpers/generate");

//[POST] /api/v1/users/register
module.exports.register = async (req,res) => {   
    req.body.password = md5(req.body.password);
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });
    
    if(existEmail){
        res.json({
           code:400,
            message: "Email da ton tai"
        });
    }
    else{
        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            token: generateHelper.generateRandomString(30)
        });

        user.save();
        const token = user.token;
        res.cookie("token",token);

        res.json({
            code:200,
            message: "Tao tai khoan thanh cong",
            token: token
        });
    };
};
//[POST]/api/v1/users/login
module.exports.login = async (req, res) => {
    const email =  req.body.email;
    const password =  req.body.password;

    const user = await User.findOne({
        email:email,
        deleted: false
    });
    
    if(!user){
        res.json({
            code: 400,
            message: "Email ko ton tai!!!"
        });
        return;
    }
    if(md5(password) !== user.password) {
        res.json({
            code: 400,
            message: "Sai mat khau"
        });
        return;
    }
    
    const token = user.token;
    res.cookie("token",token);

    res.json({
        code:200,
        message: "Đăng nhập thành công!",
        token: token
        });
    console.log(user);
};
// [POST]/api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
            email: email,
            deleted: false,
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        });
        return;
    }
        const otp = generateHelper.generateRandomNumber(6);

        const timeExpire = 5;
// luu data vao database
        const objectForgotPassword = Password = {
            email: email,
            otp: otp,
            expireAt: Date.now() + timeExpire*6000,
        };
        console.log(otp)
        const forgotPassword = new ForgotPassword(objectForgotPassword);
        await forgotPassword.save();

    res.json({
        code: 200,
       
    });
};
// [POST]/api/v1/users/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email:email,
        otp: otp
    });
    if(!result) {
        res.json({
            code: 400,
            message: "OTP ko hop le"
        });
        return;
    }

    const user = await User.findOne({
        email:email

    });
    const token = user.token;
    res.cookie("token",token);
    
    res.json({
        code: 200,
        message: "Xac thuc thanh cong",
        token
        
    });
};
// [POST]/api/v1/users/password/reset
module.exports.resetPassword = async (req, res) => {
    const token = req.cookies.token;
    const password = req.body.password;
    
    const user = await User.findOne({
        token: token,
    });
    
    if (md5(password) === user.password) {
        res.json({
            code: 400,
            message: "Vui lòng nhập mật khẩu mới khác mật khẩu cũ.",
        });
        return;
    }
    
    await User.updateOne(
        { token: token },
        { password: md5(password) }
    );
    
    res.json({
        code:200,
        message: "Doi mat khau thanh cong"
    });
};
// [GET]/api/v1/users/detail
module.exports.detail = async (req, res) => {
    const token = req.cookies.token;

    const user = await User.findOne({
        token: token,
        deleted: false
    }).select("-password -token");
    res.json({
        code:200,
        message: "Thanh cong",
        info: user
    })
}