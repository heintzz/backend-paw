const bcrypt = require("bcrypt");
const User = require("../model/User");

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

module.exports = handleUserSignup;
