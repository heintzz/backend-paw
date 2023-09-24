const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleUserSignup = async (req, res) => {
  const { email, password } = req.body;

  // NOTE: waiting for database integration
  const duplicate = true;
  if (duplicate)
    return res.json({
      success: false,
      status: "409",
      message: "user already exist",
    });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // NOTE: waiting for database integration
    const user = {
      email,
      password: hashedPassword,
    };
    res.json({ success: true, status: "200", message: "user created" });
  } catch (error) {
    res.json({ success: false, status: "500", message: error.message });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "email and password are required" });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser)
    return res
      .status(401)
      .json({ success: false, message: "user not found, please sign up" });

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        _id: foundUser._id,
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie(
      "userProfile",
      { accessToken, username: foundUser.username },
      {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 3600 * 1000,
      }
    );
    res.status(200).json({
      success: true,
      message: "user logged in",
      data: { accessToken },
    });
  } else {
    res
      .status(401)
      .json({ success: false, message: "email or password are incorrect" });
  }
};

module.exports = { handleUserSignup, handleUserLogin };
