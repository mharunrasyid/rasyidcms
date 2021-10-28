var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var User = require("../model/user");
var DataDate = require("../model/datadate");

chai.use(chaiHttp);

chai.should();

describe("DataDate", function () {
  beforeEach(function (done) {
    let user = new User({ email: "test@rmail.com", password: "1234" });
    let datadate = new DataDate({ letter: "2017-12-31", frequency: 1.2 });

    user.save(function () {
      datadate.save(function () {
        done();
      });
    });
  });

  afterEach(function (done) {
    User.findOneAndRemove({ email: "test@rmail.com" }).then(function () {
      DataDate.findOneAndRemove({ letter: "2017-12-31" }).then(function () {
        done();
      });
    });
  });

  it("should get list from datadate with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .post("/api/datadate/search")
          .set("authorization", response.body.token)
          .send({ letter: "2017-12-31", frequency: 1.2 })
          .end(function (err, res) {
            res.body.should.be.a("array");
            res.body[0].should.be.a("object");
            res.body[0].should.have.property("_id");
            res.body[0].should.have.property("letter");
            res.body[0].should.have.property("frequency");
            res.body[0]._id.should.be.a("string");
            res.body[0].letter.should.equal("2017-12-31");
            res.body[0].frequency.should.equal(1.2);
            done();
          });
      });
  });

  it("should get list from datadate with method GET", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .get("/api/datadate")
          .set("authorization", response.body.token)
          .end(function (err, res) {
            res.body.should.be.a("array");
            if (res.body.length != 0) {
              for (let i = 0; i < res.body.length; i++) {
                res.body[i].should.be.a("object");
                res.body[i].should.have.property("_id");
                res.body[i].should.have.property("letter");
                res.body[i].should.have.property("frequency");
                res.body[i]._id.should.be.a("string");
                res.body[i].letter.should.be.a("string");
                res.body[i].frequency.should.be.a("number");
              }
            }
            done();
          });
      });
  });

  it("should create one datadate with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .post("/api/datadate")
          .set("authorization", response.body.token)
          .send({ letter: "2018-05-12", frequency: 1.5 })
          .end(function (err, res) {
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("message");
            res.body.should.have.property("data");

            res.body.success.should.equal(true);
            res.body.message.should.equal("data have been added");
            res.body.data.should.be.a("object");

            res.body.data.should.have.property("_id");
            res.body.data.should.have.property("letter");
            res.body.data.should.have.property("frequency");

            res.body.data._id.should.be.a("string");
            res.body.data.letter.should.equal("2018-05-12");
            res.body.data.frequency.should.equal(1.5);

            DataDate.findById(res.body.data._id).then(function (data) {
              data.remove().then(function () {
                done();
              });
            });
          });
      });
  });

  it("should find one datadate with method GET<ID_DATA_DATE>", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, responseUser) {
        chai
          .request(app)
          .get("/api/datadate")
          .set("authorization", responseUser.body.token)
          .end(function (err, response) {
            chai
              .request(app)
              .get(`/api/datadate/${response.body[response.body.length - 1]._id}`)
              .set("authorization", responseUser.body.token)
              .end(function (err, res) {
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("message");
                res.body.should.have.property("data");

                res.body.success.should.equal(true);
                res.body.message.should.equal("data found");
                res.body.data.should.be.a("object");

                res.body.data.should.have.property("_id");
                res.body.data.should.have.property("letter");
                res.body.data.should.have.property("frequency");

                res.body.data._id.should.be.a("string");
                res.body.data.letter.should.equal("2017-12-31");
                res.body.data.frequency.should.equal(1.2);

                done();
              });
          });
      });
  });

  it("should delete one datadate with method DELETE<ID_DATA_DATE>", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, responseUser) {
        chai
          .request(app)
          .get("/api/datadate")
          .set("authorization", responseUser.body.token)
          .end(function (err, response) {
            chai
              .request(app)
              .delete(
                `/api/datadate/${response.body[response.body.length - 1]._id}`
              )
              .set("authorization", responseUser.body.token)
              .end(function (err, res) {
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("message");
                res.body.should.have.property("data");

                res.body.success.should.equal(true);
                res.body.message.should.equal("data have been deleted");
                res.body.data.should.be.a("object");

                res.body.data.should.have.property("_id");
                res.body.data.should.have.property("letter");
                res.body.data.should.have.property("frequency");

                res.body.data._id.should.be.a("string");
                res.body.data.letter.should.equal("2017-12-31");
                res.body.data.frequency.should.equal(1.2);

                done();
              });
          });
      });
  });

  it("should edit one datadate with method PUT<ID_DATA_DATE>", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, responseUser) {
        chai
          .request(app)
          .get("/api/datadate")
          .set("authorization", responseUser.body.token)
          .end(function (err, response) {
            chai
              .request(app)
              .put(`/api/datadate/${response.body[response.body.length - 1]._id}`)
              .set("authorization", responseUser.body.token)
              .send({ letter: "2018-05-12", frequency: 1.5 })
              .end(function (err, res) {
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("message");
                res.body.should.have.property("data");

                res.body.success.should.equal(true);
                res.body.message.should.equal("data have been updated");
                res.body.data.should.be.a("object");

                res.body.data.should.have.property("_id");
                res.body.data.should.have.property("letter");
                res.body.data.should.have.property("frequency");

                res.body.data._id.should.be.a("string");
                res.body.data.letter.should.equal("2018-05-12");
                res.body.data.frequency.should.equal(1.5);

                DataDate.findById(res.body.data._id).then(function (data) {
                  data.remove().then(function () {
                    done();
                  });
                });
              });
          });
      });
  });
});
