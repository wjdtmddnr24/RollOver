var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var laboratorySchema = new Schema({
    name: {type: String, required: true},
    created: {type: Date, default: Date.now},
    location: {type: String, required: true},
    img_url: {type: String, required: true},
    computer: {
        type: [{
            name: {type: String, required: true},
            created: {type: Date, default: Date.now},
            location: {
                X: {type: Number, required: true},
                Y: {type: Number, required: true},
                W: {type: Number, required: true},
                H: {type: Number, required: true}
            },
            property: [String],
            reports: {
                type: [{
                    title: {type: String, required: true},
                    content: {type: String, required: true},
                    author: {type: String, required: true},
                    created: {type: Date, default: Date.now},
                    tags: [String],
                    status: {type: Number, required: true},
                    comments: {
                        type: [{
                            author: {type: String, required: true},
                            created: {type: Date, default: Date.now},
                            title: {type: String, required: true},
                            content: {type: String, required: true}
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