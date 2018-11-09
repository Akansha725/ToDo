const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app.js');

describe('GET', () => {
  it('should respond with full list', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      should.not.exist(err);
      res.statusCode.should.equal(200);
      res.type.should.equal('text/html');
      done();
    });
  });
});

describe('POST', () => {
  it('should add task in list', (done) => {
    chai.request(server)
    .post('/addTask')
    .send({name: 'Drink Water', status: "In-Progress"})
    .end((err, res) => {
      should.not.exist(err);
      res.type.should.equal('text/html');
      done();
    });
  });
});


describe('PUT', () => {
  it('should update status of list', (done) => {
    chai.request(server)
    .put('/updateTask')
    .send({name: 'Drink Water'})
    .end((err, res) => {
      should.not.exist(err);
      res.type.should.equal('text/html');
      done();
    });
  });
});


describe('DELETE', () => {
  it(' should delete task from list', (done) => {
    chai.request(server)
    .delete('/deleteTask/1')
    .end((err, res) => {
      should.not.exist(err);
      res.type.should.equal('text/html');
      done();
    });
  });
});
