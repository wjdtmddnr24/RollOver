var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var laboratorySchema = new Schema({
    name: {type: String, required: true},
    created: {type: Date, default: Date.now},
    location: {type: String, required: true},
    img_url: {type: String, default: '',},
    computers: {
        type: [{
            name: {type: String, required: true},
            created: {type: Date, default: Date.now},
            location: {
                X: {type: Number},
                Y: {type: Number},
                W: {type: Number},
                H: {type: Number}
            },
            property: String,
            reports: {
                type: [{
                    title: {type: String},
                    content: {type: String},
                    author: {type: String},
                    created: {type: Date, default: Date.now},
                    tags: [String],
                    status: {type: Number, default: 0},
                    comments: {
                        type: [{
                            author: {type: String},
                            created: {type: Date, default: Date.now},
                            title: {type: String},
                            content: {type: String}
                        }],
                        default: []
                    }
                }],
                default: []
            }
        }],
        default: []
    }
});

module.exports = mongoose.model('laboratory', laboratorySchema);