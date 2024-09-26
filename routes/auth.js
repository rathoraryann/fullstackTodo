const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const exsistingUser = await User.findOne({ email })
        if (exsistingUser) {
            return res.status(200).json({ message: "User already exists" })
        }
        // const user = new User({email, username, password});
        // console.log(user)
        // await user.save().then(()=>
        //     res.status(200).json({user: user})
        // )
        await User.create({ email, username, password: hashedPassword }).then(() =>
            res.status(200).json({ message: "User created successfully" }))
    } catch (error) {
        res.status(400).json({
            message: "User not created! Some Error",
        })
    }
})

// SIGN IN
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(200).json({ message: "User not found" });
        }

        const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(200).json({ message: "Wrong Password" });
        }

        const { password, ...others } = user._doc; // Exclude password from response
        res.status(200).json({ user: others });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred. Please try again later.",
        });
    }
});




module.exports = router;