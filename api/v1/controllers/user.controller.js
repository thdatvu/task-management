const md5 = require("md5");
const User = require("../models/user.model");

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