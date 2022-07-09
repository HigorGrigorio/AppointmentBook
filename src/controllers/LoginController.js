const Login = require('../models/LoginModel');

exports.loginIndex = (req, res) => {
    res.render('login');
};

exports.registerIndex = (req, res) => {
    res.render('register');
};

exports.registerUser = async (req, res) => {
    try {
        const login = new Login(req.body);

        let result = await login.register();

        if (!result) {
            req.flash('errors', login.errors);

            req.session.save(function () {
                res.redirect('index/#register');
            });

            return;
        }
        res.redirect('/#home');
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.loginUser = async (req, res) => {
    try {

        const login = new Login(req.body);

        let result = await login.login();

        if (!result) {
            req.flash('errors', login.errors);

            req.session.save(function () {
                res.redirect('/login/index/#login');
            });

            return;
        }

        req.flash('success', ['You enter the system!']);
        req.session.user = login.user;
        req.session.save(function () {
            res.redirect('/#home');
        });

    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

/**
 * 
 * @param {HTTPRequest} req 
 * @param {HTTPRequest} res 
 */
exports.logoutUser = async function (req, res) {
    try {
        if (req.session) {
            await req.session.destroy();
            res.redirect('/#home');
        }
        else {
            req.flash('errors', ['Error while logging out']);
        }
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};  