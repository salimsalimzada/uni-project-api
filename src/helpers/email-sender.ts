import nodemailer from "nodemailer";

type SendingEmailArgs = {
  from: string;
  to: string;
  subject: string;
  text: string;
};
export const sendEmail = async ({
  from,
  to,
  subject,
  text,
}: SendingEmailArgs) => {
  try {
    const mailOptions = {
      from,
      to,
      subject,
      text,
    };
    const transporterResponse = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "salimsalimzada2002@gmail.com",
        pass: "temh hlry nrpo rvtk",
      },
    });
    return await transporterResponse.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};
