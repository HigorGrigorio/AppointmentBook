const Contact = require('../models/ContactModel');

exports.index = async (req, res) => {
    const contacts = await Contact.getAll();
    res.render('contact', { contacts });
};

exports.addIndex = async (req, res) => {
    res.render('add-contact', { contact: null });
};

exports.add = async (req, res) => {
    try {
        const contact = new Contact(req.body);

        let result = await contact.register();

        if (!result) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
                res.redirect('/contact/add/index');
            })
            return;
        }

        req.flash('success', 'contact successfully added!');
        req.session.save(() => {
            res.redirect('/contact/index');
        });
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    if (!req.params.id) {
        res.render('404');
    }

    const contact = await Contact.getById(req.params.id);

    if (!contact) {
        res.render('404');
    }

    res.render('add-contact', { contact });
};

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) {
            res.render('404');
        }

        const { id } = req.params;
        const contact = new Contact(req.body);

        if (!contact) {
            res.render('404');
        }

        let result = await contact.edit(id);

        if (!result) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
                res.redirect('/contact/add/index');
            })
            return;
        }

        req.flash('success', 'contact successfully added!');
        req.session.save(() => {
            res.redirect('/contact/index');
        });
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.confirmDelete = async (req, res) => {
    try {
        if (!req.params.id) {
            res.render('404');
        }

        const { id } = req.params;
        const contact = await Contact.getById(id);

        if (!contact) {
            res.render('404');
        }

        res.render('confirm-delete', { contact });
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.render('404');
        }

        const contact = await Contact.getById(id);

        if (!contact) {
            res.render('404');
        }

        contact.delete();
        res.redirect('/contact/index');
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}