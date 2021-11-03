var express = require("express");
var router = express.Router();
var Map = require("../model/map");

const helpers = require("../helpers/util");

/* GET users listing. */

router.post("/search", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const map = await Map.find({title: { $regex: '.*' + req.body.title + '.*' } });
    if (!map) return res.json({ data: "not found" });

    res.json(map);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.get("/", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const map = await Map.find({});

    res.json(map);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const map = await Map.create(req.body);
    if (!map) return res.json({ data: "data not added" });

    let resData = {
      success: true,
      message: "data have been added",
      data: map,
    };

    res.json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

router.put("/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const map = await Map.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!map) return res.json({ data: "data not updated" });

    let resData = {
      success: true,
      message: "data have been updated",
      data: map,
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.delete("/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const map = await Map.findByIdAndRemove(req.params.id);

    if (!map) return res.json({ data: "data not deleted" });

    let resData = {
      success: true,
      message: "data have been deleted",
      data: map,
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/:id", helpers.isLoggedIn, async function (req, res, next) {
  try {
    const map = await Map.findOne({ _id: req.params.id });

    if (!map) return res.json({ data: "data not found" });

    let resData = {
      success: true,
      message: "data found",
      data: map,
    };

    res.json(resData);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
