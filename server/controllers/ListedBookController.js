// controllers/ListedBookController.js

const ListedBook = require('../models/ListedBook.js');

// Add param checking

module.exports = {

    async getAllListedBooks(req, res) {
        try {
            const listings = await ListedBook.find({});
            res.json(listings);
        } catch (err) {
            console.log(err);
            res.status(404).json({ nolistingsfound: `No Listings Found.`, err });
        }
    },

    async getListedBookById(req, res) {
        try {
            const book = await ListedBook.findById(req.params.id);
            res.status(200).json(book);
          } catch (err) {
            console.log(err);
            res.status(404).json({ nolistingsfound: `Listing Not Found.`, err});
          }
    },

    async createListedBook(req, res) {
        try {
            const book = new ListedBook(req.body);
            await book.save();
            res.status(200).json({ listingaddsuccess: `Listing added successfully`, book});
          } catch (err) {
            // console.log(err);
            res.status(404).json({ listingaddfailure: `Unable to add listing`, err });
          }
    },

    async updateListedBook(req, res) {
        try {
            const body = req.body;
            console.log(body);
            const book = await ListedBook.findByIdAndUpdate(req.params.id, body);
            res.status(200).json({ listingupdatesuccess: `Listing updated successfully.`, book});
          } catch (err) {
            res.status(404).json({ listingupdatefailure: `Listing update failed.`, err});
          }
    },

    async deleteListedBook(req, res) {
        try {
            const book = await ListedBook.findByIdAndRemove(req.params.id);
            res.status(202).json({ listingdeletionsuccess: `Listing Successfully Deleted`, listing });
          } catch (err) {
            res.status(400).json({ listingdeletionfailure: `Unable to delete Listing.`, err});
          }
    }


};