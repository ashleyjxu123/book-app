// tests/UserTest.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const { ObjectId } = require('mongodb');
const UserController = require('../controllers/UserController.js');
const User = require('../models/User.js');
const server = require('../server.js');

const should = chai.should();
const id = '650770c8d5b618c564de210d';

chai.use(chaiHttp);

describe('Test /users', () => {
    before('before', () => {
        console.log('Running User Tests.');
    });

    describe('GET /all users', () => {
        it('should get all users (there should be 1 user)', (done) => {
            chai.request(server)
            .get('/users/all')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
              done();
            });
        });
    });

    describe('GET /:id user', () => {
        it('should return user with id == id', (done) => {
            chai.request(server)
            .get(`/users/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('full_name');
                res.body.full_name.should.be.eql('poopoo farthead');
                done();
            });
        });
    });

    describe('GET /name/:name user', () => {
        it('should return books with matching or like names', (done) => {
            chai.request(server)
            .get(`/users/name/poopoo farthead`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
        });
    });

    describe('GET /username/:username user', () => {
        it('should return books with matching or like usernames', (done) => {
            chai.request(server)
            .get(`/users/username/jarjar1000`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
        });
    });

    describe('POST /id user', () => {
        it('should not POST user with no username', (done) => {
            const user = {
                f_name: "bob",
                l_name: "mcbob",
                full_name: "bob mcbob",
                email: "bobmcbob123@gmail.com",
                password: "b0bmcb0b",
            }

            chai.request(server)
            .post(`/users`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('useraddfailure');
                done();
            });
        });

        it('should POST user', (done) => {
            const user = {
                f_name: "bob",
                l_name: "mcbob",
                full_name: "bob mcbob",
                username: "heyitsbob123",
                email: "bobmcbob123@gmail.com",
                password: "b0bmcb0b",
                zip_code: "06903",
            }

            chai.request(server)
            .post(`/users`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('f_name');
                res.body.f_name.should.be.eql("bob");
                done();
            });
        });

    });
});