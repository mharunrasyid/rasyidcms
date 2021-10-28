var express = require("express");
var router = express.Router();
var DataDate = require("../model/datadate");

const helpers = require("../helpers/util");

/* GET users listing. */

router.post("/search", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const datadate = await DataDate.find(req.body);
    if (!datadate) return res.json({ data: "not found" });

    res.json(datadate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.get("/", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const datadate = await DataDate.find({});

    res.json(datadate);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/", helpers.isLoggedIn, async function (req, res, next) {
  try {
    console.log(req.body.letter);
    const datadate = await DataDate.create(req.body);
    if (!datadate) return res.json({ data: "data not added" });

    let resData = {
      success: true,
      message: "data have been added",
      data: datadate,
    };

    res.json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.put("/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const datadate = await DataDate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!datadate) return res.json({ data: "data not updated" });

    let resData = {
      success: true,
      message: "data have been updated",
      data: datadate,
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const datadate = await DataDate.findByIdAndRemove(req.params.id);

    if (!datadate) return res.json({ data: "data not deleted" });

    let resData = {
      success: true,
      message: "data have been deleted",
      data: datadate,
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const datadate = await DataDate.findOne({ _id: req.params.id });

    if (!datadate) return res.json({ data: "data not found" });

    let resData = {
      success: true,
      message: "data found",
      data: datadate,
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
