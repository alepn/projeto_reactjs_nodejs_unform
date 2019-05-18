const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const FileSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        path:{
            type: String,
            required: true
        }        
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

FileSchema.plugin(mongoosePaginate);

FileSchema.virtual('url').get(function(){
    const url = process.env.URL || `http://localhost:8000`;
    return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', FileSchema);