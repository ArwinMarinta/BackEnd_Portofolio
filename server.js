require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { NODEMAILER_EMAIL } = process.env;
const db = require("./config/database");
const app = express();
const { sendEmail } = require("./utils/sendEmail");

const PORT = 3009;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/contact", async (req, res) => {
  const { name, email, description } = req.body;

  try {
    if (!name || !email || !description) {
      return res.status(400).json({
        msg: "Name, email, dan description tidak boleh kosong.",
      });
    }

    const mailOptions = {
      from: NODEMAILER_EMAIL,
      to: NODEMAILER_EMAIL,
      subject: `Contact From ${name}`,
      html: `
                <p style="font-size:30px" >Email:</p>
                <p style="font-size:25px">${email}</p>
                <p style="font-size:30px">Description:</p>
                <p style="color:black;font-size:25px;letter-spacing:2px;">${description}</p>
               
            `,
    };
    await sendEmail(mailOptions);

    return res.status(200).json({
      msg: "Berhasil Mengirim Data",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Gagal Mengirim Pesan",
      err: error,
    });
  }
});

app.get("/test", async (req, res) => {
  return res.status(200).send("Connect Success");
});

app.listen(PORT, () => {
  console.log(`App Running in  ${PORT}`);
});
