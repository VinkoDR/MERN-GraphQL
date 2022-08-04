const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum:['Not Started','In Progress','Completed'],
    },
    // i want clientId to be an objectId but i want to the client model =>
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    }
})

module.exports = mongoose.model('Project', ProjectSchema)