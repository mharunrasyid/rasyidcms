var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var User = require("../model/user");
var Map = require("../model/map");

chai.use(chaiHttp);

chai.should();

describe("Map", function () {
  beforeEach(function (done) {
    let user = new User({ email: "test@rmail.com", password: "1234" });
    let map = new Map({
      title: "Trans Studio Mall",
      lat: -6.9261257,
      lng: 107.6343728,
    });

    user.save(function () {
      map.save(function () {
        done();
      });
    });
  });

  afterEach(function (done) {
    User.findOneAndRemove({ email: "test@rmail.com" }).then(function () {
      Map.findOneAndRemove({ title: "Trans Studio Mall" }).then(function () {
        done();
      });
    });
  });

  it("should get list from map with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .post("/api/maps/search")
          .set("authorization", response.body.token)
          .send({
            title: "Trans Studio Mall",
            lat: -6.9261257,
            lng: 107.6343728,
          })
          .end(function (err, res) {
            res.body.should.be.a("array");
            res.body[0].should.be.a("object");
            res.body[0].should.have.property("_id");
            res.body[0].should.have.property("title");
            res.body[0].should.have.property("lat");
            res.body[0].should.have.property("lng");
            res.body[0]._id.should.be.a("string");
            res.body[0].title.should.equal("Trans Studio Mall");
            res.body[0].lat.should.equal(-6.9261257);
            res.body[0].lng.should.equal(107.6343728);
            done();
          });
      });
  });

  it("should get list from map with method GET", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .get("/api/maps")
          .set("authorization", response.body.token)
          .end(function (err, res) {
            res.body.should.be.a("array");
            if (res.body.length != 0) {
              for (let i = 0; i < res.body.length; i++) {
                res.body[i].should.be.a("object");
                res.body[i].should.have.property("_id");
                res.body[i].should.have.property("title");
                res.body[i].should.have.property("lat");
                res.body[i].should.have.property("lng");
                res.body[i]._id.should.be.a("string");
                res.body[i].title.should.be.a("string");
                res.body[i].lat.should.be.a("number");
                res.body[i].lng.should.be.a("number");
              }
            }
            done();
          });
      });
  });

  it("should create one map with method POST", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, response) {
        chai
          .request(app)
          .post("/api/maps")
          .set("authorization", response.body.token)
          .send({ title: "Bumi", lat: 1.07991, lng: 15.95057 })
          .end(function (err, res) {
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("message");
            res.body.should.have.property("data");

            res.body.success.should.equal(true);
            res.body.message.should.equal("data have been added");
            res.body.data.should.be.a("object");

            res.body.data.should.have.property("_id");
            res.body.data.should.have.property("title");
            res.body.data.should.have.property("lat");
            res.body.data.should.have.property("lng");

            res.body.data._id.should.be.a("string");
            res.body.data.title.should.equal("Bumi");
            res.body.data.lat.should.equal(1.07991);
            res.body.data.lng.should.equal(15.95057);

            Map.findById(res.body.data._id).then(function (data) {
              data.remove().then(function () {
                done();
              });
            });
          });
      });
  });

  it("should find one map with method GET<ID_MAP>", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, responseUser) {
        chai
          .request(app)
          .get("/api/maps")
          .set("authorization", responseUser.body.token)
          .end(function (err, response) {
            chai
              .request(app)
              .get(`/api/maps/${response.body[response.body.length - 1]._id}`)
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
                res.body.data.should.have.property("title");
                res.body.data.should.have.property("lat");
                res.body.data.should.have.property("lng");

                res.body.data._id.should.be.a("string");
                res.body.data.title.should.equal("Trans Studio Mall");
                res.body.data.lat.should.equal(-6.9261257);
                res.body.data.lng.should.equal(107.6343728);

                done();
              });
          });
      });
  });

  it("should delete one map with method DELETE<ID_MAP>", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, responseUser) {
        chai
          .request(app)
          .get("/api/maps")
          .set("authorization", responseUser.body.token)
          .end(function (err, response) {
            chai
              .request(app)
              .delete(
                `/api/maps/${response.body[response.body.length - 1]._id}`
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
                res.body.data.should.have.property("title");
                res.body.data.should.have.property("lat");
                res.body.data.should.have.property("lng");

                res.body.data._id.should.be.a("string");
                res.body.data.title.should.equal("Trans Studio Mall");
                res.body.data.lat.should.equal(-6.9261257);
                res.body.data.lng.should.equal(107.6343728);

                done();
              });
          });
      });
  });

  it("should edit one map with method PUT<ID_MAP>", function (done) {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "test@rmail.com", password: "1234" })
      .end(function (err, responseUser) {
        chai
          .request(app)
          .get("/api/maps")
          .set("authorization", responseUser.body.token)
          .end(function (err, response) {
            chai
              .request(app)
              .put(`/api/maps/${response.body[response.body.length - 1]._id}`)
              .set("authorization", responseUser.body.token)
              .send({ title: "Daerah", lat: 19.89442, lng: 2.78943 })
              .end(function (err, res) {
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("message");
                res.body.should.have.property("data");

                res.body.success.should.equal(true);
                res.body.message.should.equal("data have been updated");
                res.body.data.should.be.a("object");

                res.body.data.should.have.property("_id");
                res.body.data.should.have.property("title");
                res.body.data.should.have.property("lat");
                res.body.data.should.have.property("lng");

                res.body.data._id.should.be.a("string");
                res.body.data.title.should.equal("Daerah");
                res.body.data.lat.should.equal(19.89442);
                res.body.data.lng.should.equal(2.78943);

                Map.findById(res.body.data._id).then(function (data) {
                  data.remove().then(function () {
                    done();
                  });
                });
              });
          });
      });
  });
});
