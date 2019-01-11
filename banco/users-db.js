const mongoose = require('mongoose');
const config = require('./conf-db');

const {db: {host, port, user, pass, database}} = config;
const mongoStrConn = `mongodb://${user}:${pass}@${host}:${port}/${database}`;
mongoose.connect(mongoStrConn)

const UserSchema = new mongoose.Schema({
    _id: String,
    profile:{
        name: String,
        email: String
    } 
});

const User = mongoose.model('users', UserSchema)

module.exports = {
    getByEmail: userEmail => User.findOne({'profile.email': userEmail})
}