const User = require("../models/User");

// Шинэ хэрэглэгч үүсгэх
exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email болон password хоосон байж болохгүй" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("CreateUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Бүх хэрэглэгч авах
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // orderedFoods-ийг авч болохгүй
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Нэг хэрэглэгч авах
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Хэрэглэгч update
exports.updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Хэрэглэгч устгах
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
