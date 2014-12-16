var mongoose = require('mongoose');

var wemoSchema = new mongoose.Schema({
    _id: {
        $oid: Number
    },
    time: Number,
    watts: Number
},
                                    { collection : 'wemo' });

module.exports = mongoose.model('Wemo', wemoSchema);
