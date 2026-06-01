const bcrypt = require("bcryptjs");
const { User } = require("../models/index.js");
const generateToken = require("../utils/jwt.js");
const register = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = generateToken(user);

  res.json({
    token,
    user,
  });
};

module.exports = { register, login };
