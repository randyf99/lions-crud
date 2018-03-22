var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

describe('[LIONS]', function() {
  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', '/json/')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'Mufasa',
        age: 100,
        pride: 'Evil Cats',
        gender: 'male'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

