var express = require("express");
var router = express.Router();
var User = require("../model/user");
var jwt = require("jsonwebtoken");

const helpers = require("../helpers/util");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET users listing. */

// router.get("/", async function (req, res, next) {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

// router.put("/:id", async function (req, res, next) {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

// router.delete("/:id", async function (req, res, next) {
//   try {
//     const user = await User.findByIdAndRemove(req.params.id);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(500).json({ err: "email or password wrong" });

    bcrypt.compare(
      req.body.password,
      user.password,
      async function (err, result) {
        if (err) throw err;

        if (result) {
          var token = jwt.sign(
            {
              email: user.email,
            },
            "shhhhh"
          );

          let dataAll = {
            data: {
              email: user.email,
            },
            token,
          };

          req.body.token = token;

          const userEdit = await User.findByIdAndUpdate(
            user._id,
            {
              token: req.body.token,
            },
            {
              new: true,
            }
          );

          res.json(dataAll);
        } else {
          res.status(500).json({ err: "email or password wrong" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/register", async function (req, res, next) {
  try {
    if (req.body.password == req.body.retypepassword) {
      const checkUser = await User.findOne({ email: req.body.email });

      if (checkUser)
        return res.status(500).json({ err: "email already exist" });

      var token = jwt.sign(
        {
          email: req.body.email,
        },
        "shhhhh"
      );

      req.body.token = token;

      const user = await User.create(req.body);

      let dataAll = {
        data: {
          email: req.body.email,
        },
        token,
      };

      res.json(dataAll);
    } else {
      return res.status(500).json({ err: "password not match" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/check", async (req, res) => {
  try {
    const checkUser = await User.findOne({ token: req.body.token });
    if (checkUser) {
      res.json({ valid: true });
    } else {
      return res.json({ valid: false });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/destroy", helpers.isLoggedIn, async (req, res) => {
  try {
    let token = req.headers.authorization.replace("Bearer ", "");
    const user = await User.findOneAndUpdate(
      { token },
      {
        token: null,
      },
      {
        new: true,
      }
    );
    
    res.json({ logout: true });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
