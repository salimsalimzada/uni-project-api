import { config } from "dotenv";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../helpers/auth";
import { sendEmail } from "../helpers/email-sender";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        faculty: req.body.faculty,
        speciality: req.body.speciality,
      },
    });
    const token = createJWT(user);
    if (token) {
      try {
        const emailData = await sendEmail({
          from: "no-reply@example.com",
          to: `${user.email}`,
          subject: "Account Verification Link",
          text: `Hello, ${user.firstName} ${user.lastName}, please verify you email by clicking this link: ${process.env.baseUrl}/${user.id}/${token}`,
        });
        if (emailData.response.includes("OK"))
          return res.json({
            status: 201,
            message: "confirm your email address for completing registration",
          });
      } catch (error) {
        throw new Error(`something went wrong while sending email`);
      }
    }
  } catch (error) {
    console.log(error, "error");
    error.type = "input";
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  return res.json({
    message: "hello from sign in",
  });
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       email: req.body.email,
  //     },
  //   });

  //   const isValid = await comparePasswords(req.body.password, user.password);

  //   if (!isValid) {
  //     res.status(401);
  //     res.json({ message: "nope there might be a problem" });
  //     return;
  //   }

  //   const token = createJWT(user);
  //   res.json({ token });
};
