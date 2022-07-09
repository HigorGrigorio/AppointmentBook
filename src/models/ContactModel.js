const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telephone: { type: String, required: false, default: '' },
    date: { type: Date, required: false, default: Date.now() }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        if (!this.validate()) {
            return false;
        }

        this.contact = await ContactModel.create({
            name: this.body.name.split(' ')[0],
            surname: this.body.name.split(' ').slice(1).join(' '),
            email: this.body.email,
            telephone: this.body.telephone
        });

        return true;
    }

    static async getById(id) {
        if (typeof id !== 'string') {
            return;
        }

        return await ContactModel.findById(id);
    }

    validate() {
        this.cleanup();

        if (!this.body.name === '' && !this.body.email === '' && !this.body.telephone === '') {
            this.errors.push('Form is empty!');
            return false;
        }

        if (!this.body.name) {
            this.errors.push('Name is a requerid field.');
            return false;
        }

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('Invalid E-Mail address.');
            return false;
        }

        if (!this.body.email && !this.body.telephone) {
            this.errors.push('fill in at least one contact field');
            return false;
        }

        return true;
    }

    async edit(id) {
        if (typeof id !== 'string') {
            return false;
        }

        if (!this.validate()) {
            return false;
        }

        this.contact = await ContactModel.findByIdAndUpdate(id, {
            name: this.body.name.split(' ')[0],
            surname: this.body.name.split(' ').slice(1).join(' '),
            email: this.body.email,
            telephone: this.body.telephone
        }, { new: true });

        return true;
    }

    cleanup() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
    }

    static async getAll() {
        const contacts =  await ContactModel.find().sort({ date: -1 });
        return contacts;
    }

    async delete()
    {
        if(!this.contact)
        {
            return false;
        }

        await ContactModel.findOneAndDelete(this.contact._id);
        return true;
    }
};

module.exports = Contact;