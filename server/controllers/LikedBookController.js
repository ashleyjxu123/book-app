// controllers/LikedBookController.js

const LikedBook = require('../models/LikedBook.js');

// Add param checking

module.exports = {

    async getAllLikedBooks(req, res) {
        try {
            const likes = await LikedBook.find({});
            res.json(likes);
        } catch (err) {
            console.log(err);
            res.status(404).json({ nolikesfound: `No Liked Books Found.`, err });
        }
    },

    async getLikedBookById(req, res) {
        try {
            const book = await LikedBook.findById(req.params.id);
            res.status(200).json(book);
          } catch (err) {
            console.log(err);
            res.status(404).json({ nolikesfound: `Liked Book Not Found.`, err});
          }
    },

    async createLikedBook(req, res) {
        try {
            const book = new LikedBook(req.body);
            await book.save();
            res.status(200).json({ likesaddsuccess: `Book added successfully to likes.`, book});
          } catch (err) {
            // console.log(err);
            res.status(404).json({ likesaddfailure: `Unable to add book to likes.`, err });
          }
    },

    // async updateLikedBook(req, res) {
    //     try {
    //         const body = req.body;
    //         console.log(body);
    //         const book = await LikedBook.findByIdAndUpdate(req.params.id, body);
    //         res.status(200).json({ listingupdatesuccess: `Listing updated successfully.`, book});
    //       } catch (err) {
    //         res.status(404).json({ listingupdatefailure: `Listing update failed.`, err});
    //       }
    // },

    async deleteLikedBook(req, res) {
        try {
            const book = await LikedBook.findByIdAndRemove(req.params.id, req.body);
            res.status(202).json({ likesdeletionsuccess: `Like successfully removed.`, book });
          } catch (err) {
            res.status(400).json({ likesdeletionfailure: `Unable to delete like.`, err});
          }
    }


};