import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../config";

const prisma = new PrismaClient();
const userRouter = Router();

// Signup route
userRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ error: "Username already exists" });
  }
});

// Signin route
userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = await jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET
  );
  return res.json("" + token);
});

export default userRouter;
