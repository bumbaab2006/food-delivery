const User = require("../models/User");

// Шинэ хэрэглэгч үүсгэх (туршилт)
exports.createUser = async (req, res) => {
  try {
    const { mail, password, phoneNumber, address, role } = req.body;

    const user = new User({
      mail,
      password,
      phoneNumber,
      address,
      role,
      orderedFoods: [],
      isVerified: false,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Бүх хэрэглэгч авах
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("orderedFoods");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Нэг хэрэглэгч авах
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("orderedFoods");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Хэрэглэгч update
exports.updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Хэрэглэгч устгах
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
