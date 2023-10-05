// controllers/BookController.js
const axios = require('axios');

module.exports = {
    async getBookById(req, res) {
        await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${req.params.id}`
        ).then(function(response) {
            res.send(response.data);
        }).catch(function(error) {
            res.send({
                status: '500',
                message: req.params.id
            })
        });
    }, 

    async getBookByTitle(req, res) {
        const title = encodeURIComponent(req.params.title);
        await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`
        ).then(function(response) {
            res.send(response.data);
        }).catch(function(error) {
            res.send({
                status: '500',
                message: error
            })
        });
    }, 

    async getBookByAuthor(req, res) {
        const author = encodeURIComponent(req.params.author);
        await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${author}`
        ).then(function(response) {
            res.send(response.data);
        }).catch(function(error) {
            res.send({
                status: '500',
                message: error
            })
        });
    }
}