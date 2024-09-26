const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function authMiddleware(req, res, next) {
    try {
        // const email = req.headers.email;
        // const password = req.headers.password;
        // try {
        //     const user = await User.findOne({ email: email })
        //     if (!user) {
        //         return res.json({ msg: "user not found" })
        //     }
        //     const isMatch = bcrypt.compareSync(password, user.password);
        //     if (isMatch) {
        //         req.user = user
        //         next()
        //     }
        // } catch (error) {
        //     return res.json({
        //         msg: "Invalid credentials"
        //     })
        // }
        const id = req.body.id;
        const user = await User.findById(id);
        if (!user) return;
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
    }

}

module.exports = authMiddleware