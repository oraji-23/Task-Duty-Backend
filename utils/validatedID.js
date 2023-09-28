const mongoose = require("mongoose")

const validateId = (id) =>{
    const isvalid = mongoose.Types.ObjectId.isValid(id)
    return isvalid
}




module.exports = validateId