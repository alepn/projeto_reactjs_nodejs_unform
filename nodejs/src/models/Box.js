const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const BoxSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
    },
    {
	    timestamps: true
    }
);

BoxSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Box', BoxSchema);