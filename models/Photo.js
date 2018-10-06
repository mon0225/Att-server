const moongose = require('mongoose');
const {Schema} = moongose;

const photoSchema = new Schema({
    ImgPath: String
},{
    timestamps: { createdAt: "createdAt", updateAt: "updateAt"}
});

let Photo = moongose.model("Photo", photoSchema);

module.exports = Photo; 
