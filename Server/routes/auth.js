const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requiredLogin = require("../middleware/requiredLogin")

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !name || !password) {
        return res.status(422).json({ error: "Please Add all fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User Already Exist" })
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        name,
                        email,
                        password: hashedPassword
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved user in db" })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })

        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422), json({ error: "please add all fields" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422), json({ error: "invalid Credentials" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email } })
                        // res.status(200).json({ message: "login Successfully" })
                    }
                    else {
                        res.status(422).json({ error: "invalid Credentials" })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
})

module.exports = router