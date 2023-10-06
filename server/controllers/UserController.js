// controllers/UserController.js

const User = require('../models/User');

// Add param checking

module.exports = {

    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(404).json({ nouserfound: `No Users Found.`, err });
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
          } catch (err) {
            console.log(err);
            res.status(404).json({ nouserfound: `User Not Found`, err});
          }
    },

    async getUserByName(req, res) {
        try {
            // $regex with option i ignores case
            const users = await User.find({full_name: new RegExp(req.params.name, 'i')});
            res.status(200).json(users);
          } catch (err) {
            console.log(err);
            res.status(404).json({ nouserfound: `User Not Found`, err});
          }
    },

    async getUserByUsername(req, res) {
        try {
            // $regex with option i ignores case
            const users = await User.find({username: new RegExp(req.params.username, 'i')});
            res.status(200).json(users);
          } catch (err) {
            console.log(err);
            res.status(404).json({ nouserfound: `User Not Found`, err});
          }
    },

    async createUser(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(200).json({ useraddsuccess: `User added successfully`, user});
          } catch (err) {
            // console.log(err);
            res.status(404).json({ useraddfailure: `Unable to add user`, err });
          }
    },

    async updateUser(req, res) {
        try {
            const body = req.body;
            console.log(body);
            const user = await User.findByIdAndUpdate(req.params.id, body);
            res.status(200).json({ userupdatesuccess: `User updated successfully.`, user});
          } catch (err) {
            res.status(404).json({ userupdatefailure: `User update failed.`, err});
          }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            res.status(202).json({ userdeletionsuccess: `User Successfully Deleted`, user });
          } catch (err) {
            res.status(400).json({ userdeletionfailure: `Unable to delete user.`, err});
          }
    }


};