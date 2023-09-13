const bcrypt = require("bcrypt");

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

module.exports = handleUserSignup;
