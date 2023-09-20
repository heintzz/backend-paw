const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  // const foundUser = await User.findOne({ email: email }).exec();
  const foundUser = true;
  if (!foundUser)
    return res
      .status(401)
      .json({ success: false, message: "user not found, please sign up" });

  // const match = await bcrypt.compare(password, foundUser.password);
  const match = true;
  if (match) {
    const accessToken = jwt.sign(
      // {
      //   UserInfo: {
      //     email: foundUser.email,
      //     _id: foundUser._id,
      //   },
      // },
      {
        email: email,
        password: password,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
      // {
      //   UserInfo: {
      //     email: foundUser.email,
      //     _id: foundUser._id,
      //   },
      // },
      {
        email: email,
        password: password,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // foundUser.refreshToken = refreshToken;
    // await foundUser.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 3600 * 1000,
    });
    res.json({ accessToken });
  } else {
    res
      .sendStatus(401)
      .json({ success: false, message: "email or password are incorrect" });
  }
};

module.exports = { handleUserSignup, handleUserLogin };
