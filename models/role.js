const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Debe indicar un rol']
    }
});

module.exports = model('Role', RoleSchema);