import { Router } from "express";
import prisma from "./db";
import jwt from "jsonwebtoken";
const router = Router();

router.get("/users/confirmation/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;
  //   const userInfo = jwt.verify(token, process.env.JWT_SECRET);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.isVerified)
    return res.status(200).json({ message: "User has already been verified" });
  if (!user.isVerified) {
    const updatedUser = await prisma.user.update({
      data: { isVerified: true },
      where: { id },
    });
    if (updatedUser.isVerified) {
      return res.json({ message: "User was confirmed successfully" });
    }
  }
});
export default router;
