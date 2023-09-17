// tests/BookTest.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const { ObjectId } = require('mongodb');
const BookController = require('../controllers/BookController.js');
const Book = require('../models/Book.js');
const server = require('../server.js');

const should = chai.should();
const id = '6504bcc277c6fa6e450a0256';

chai.use(chaiHttp);

describe('Test /books', () => {
    before('before', () => {
        console.log('Running Book Tests.');
    });

    describe('GET /all book', () => {
        it('should get all books limited to 5 (bc theres 100k books)', (done) => {
            chai.request(server)
            .get('/books/all')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(5);
              done();
            });
        });
    });

    describe('GET /:id book', () => {
        it('should return book with id == id', (done) => {
            chai.request(server)
            .get(`/books/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('author');
                res.body.author.should.be.eql('Jean Leveille');
                res.body.should.have.property('title');
                res.body.title.should.be.eql('Les oiseaux gourmands');
                done();
            });
        });
    });

    describe('GET /title/:title book', () => {
        it('should return books with matching or like titles', (done) => {
            chai.request(server)
            .get(`/books/title/lord of the rings`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(13);
                done();
            });
        });
    });

    describe('GET /author/:author book', () => {
        it('should return books with matching or like authors', (done) => {
            chai.request(server)
            .get(`/books/author/j.k. rowling`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(6);
                done();
            });
        });
    });

    describe('POST /id book', () => {
        it('should not POST book with no author', (done) => {
            const book = {
                title: "The Lord of the Rings",
                year: 1954
            }

            chai.request(server)
            .post(`/books`)
            .send(book)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('bookaddfailure');
                done();
            });
        });

    });

    // describe('POST /id book', () => {
    //     it('should not POST book with no author', (done) => {
    //         const book = {
    //             title: "The Lord of the Rings",
    //             year: 1954
    //         }

    //         chai.request(server)
    //         .post(`/books`)
    //         .send(book)
    //         .end((err, res) => {
    //             res.should.have.status(404);
    //             done();
    //         });
    //     });

    // });
});