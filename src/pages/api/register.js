import clientPromise from "../../lib/mongodb";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const { name, email, password, role = "user" } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("test");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      role,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const token = jwt.sign({ userId: result.insertedId, email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User registered successfully",
      accessToken: token,
      user: { email, name, role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
