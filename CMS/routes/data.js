var express = require("express");
var router = express.Router();
// var User = require("../model/user");
var Data = require("../model/data");

const helpers = require("../helpers/util");

/* GET users listing. */

router.post("/search", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const data = await Data.find(req.body);
    if (!data) return res.json({ data: "not found" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const data = await Data.find({});

    res.json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const data = await Data.create(req.body);
    if (!data) return res.json({ data: "data not added" });

    let resData = {
      success: true,
      message: "data have been added",
      data
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.put("/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const data = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) return res.json({ data: "data not updated" });

    let resData = {
      success: true,
      message: "data have been updated",
      data
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const data = await Data.findByIdAndRemove(req.params.id);

    if (!data) return res.json({ data: "data not deleted" });

    let resData = {
      success: true,
      message: "data have been deleted",
      data
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const data = await Data.findOne({ _id: req.params.id });

    if (!data) return res.json({ data: "data not found" });

    let resData = {
      success: true,
      message: "data found",
      data
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
