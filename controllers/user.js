const User = require("../models/User");
const bcrypt = require('bcrypt');
const e = require("express");

exports.create = async (req, res) => {
    try {

        const user = new User({ email: req.body.email, password: req.body.password });
        await user.save();
        res.redirect('/?message=user created')
    } catch (error) {
        if (error.errors) {
            res.render('create-user', { errors: error.errors });
            return;
        }
        console.log(e);
        res.status(400).send({ message: 'could not create account' });
    }
}
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            res.render('login-user', { errors: { email: { message: 'email not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.redirect('/');
            return
        }

        res.render('login-user', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        console.log(e);
        return res.status(400).send({
            message: 'cannot login',
        });
    }
}