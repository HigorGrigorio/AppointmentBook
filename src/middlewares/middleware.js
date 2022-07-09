exports.checkCsrf = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404');
    }
};

exports.locals = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}