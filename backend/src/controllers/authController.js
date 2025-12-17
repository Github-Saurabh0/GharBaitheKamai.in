import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { phone, password, role, name, city, area } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "User with this phone already exists" });
    }

    const user = await User.create({
      phone,
      password,
      role: role || "worker",
      name,
      city,
      area
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        phone: user.phone,
        role: user.role,
        name: user.name,
        city: user.city,
        area: user.area
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid phone or password" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        _id: user._id,
        phone: user.phone,
        role: user.role,
        name: user.name,
        city: user.city,
        area: user.area
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};
