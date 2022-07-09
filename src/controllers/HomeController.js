// HomeModel.create({
//         title: 'A title',
//         description: 'A description'
//     })
//     .then(data => console.log(data))
//     .catch(err => console.error(err));

exports.index = (req, res) => {
    res.render('index');
};