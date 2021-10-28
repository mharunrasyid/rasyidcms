var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var User = require("../model/user");

chai.use(chaiHttp);

chai.should();

describe("Users", function () {
  beforeEach(function (done) {
    let user = new User({ email: "test@rmail.com", password: "1234" });
    user.save(function () {
      done();
    });
  });

  afterEach(function (done) {
    User.findOneAndRemove({ email: "test@rmail.com" }).then(function () {
      done();
    });
  });

  it("should get list from user after login with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, res) {
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.should.have.property("token");
        res.body.data.should.have.property("email");
        res.body.data.email.should.equal("test@rmail.com");
        res.body.token.should.be.a("string");
        done();
      });
  });

  it("should add list from user with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/register")
      .send({
        email: "lorem@rmail.com",
        password: "123",
        retypepassword: "123",
      })
      .end(function (err, res) {
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.should.have.property("token");
        res.body.data.should.have.property("email");
        res.body.data.email.should.equal("lorem@rmail.com");
        res.body.token.should.be.a("string");
        User.findOne({ token: res.body.token }).then(function (user) {
          user.remove().then(function () {
            done();
          });
        });
      });
  });

  it("should valid true response after check with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .post("/api/users/check")
          .send({
            token: response.body.token,
          })
          .end(function (err, res) {
            res.body.should.be.a("object");
            res.body.should.have.property("valid");
            res.body.valid.should.equal(true);
            done();
          });
      });
  });

  it("should loguot true response after destroy with method GET", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .get("/api/users/destroy")
          .set('authorization', response.body.token)
          .end(function (err, res) {
            res.body.should.be.a("object");
            res.body.should.have.property("logout");
            res.body.logout.should.equal(true);
            done();
          });
      });
  });
});
