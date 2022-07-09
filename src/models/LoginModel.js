const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        if (!this.validate()) {
            return false;
        }

        let userExist = await this.findUserByEmail(this.body.email);

        if (userExist) {
            this.errors.push('this email is being used.');
            return false;
        }


        const salt = bcryptjs.genSaltSync();

        this.user = await LoginModel.create({
            name: this.body.name,
            email: this.body.email,
            password: bcryptjs.hashSync(this.body.password, salt)
        });


        return true;
    }

    async login() {
        if (!this.validate()) {
            return false;
        }

        this.user = await this.findUserByEmail(this.body.email);

        if (!this.user) {
            this.errors.push('This email is not registered');
            return false;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Invalid password!');
            this.user = null;
            return false;
        }

        return true;
    }

    validate() {
        this.cleanup();

        if (this.body.email === ''
            || this.body.password === ''
            || this.body.confirm_password === ''
            || this.body.name === '') {
            this.errors.push('Fill in all form fields.');
            return false;
        }

        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Invalid E-Mail address.');
            return false;
        }

        if (this.body.password.length < 8 || this.body.password.length > 50) {
            this.errors.push('The password must contain between 8 and 50 characters.');
            return false;
        }

        // prevent that login validation access the undefined password field
        if (typeof this.body.confirm_password === 'undefined') {
            return true;
        }

        if (this.body.confirm_password !== this.body.password) {
            this.errors.push('Passwords do not match.');
            return false;
        }

        return true;
    }

    async findUserByEmail(email) {
        let user = await LoginModel.findOne({ email: email });
        return user;
    }


    cleanup() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
    }
};

module.exports = Login;