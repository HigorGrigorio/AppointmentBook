const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Home', HomeSchema);