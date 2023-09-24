const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleUserSignup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username)
    return res.status(400).json({ message: "please complete the form." });

  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res.status(409).json({
      success: false,
      message: "user already exist",
    });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      success: true,
      message: `user ${user.email} created`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
