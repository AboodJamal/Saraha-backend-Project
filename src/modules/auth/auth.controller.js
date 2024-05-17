import userModel from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema } from "./auth.validation.js";
import SendEmail from "../../utilities/sendEmail.js";

export const signUp = async (req, res) => {
    const { signUpUserName, signUpEmail, signUpPassword, age, gender } = req.body;

    const user = await userModel.findOne({ email: signUpEmail });

    if (user) {
        return res.status(409).json({ message: " email is already exists" })
    }
    const hashedPassword = await bcrypt.hash(signUpPassword, parseInt(process.env.SALTROUND));
    const createUser = await userModel.create({ userName: signUpUserName, email: signUpEmail, password: hashedPassword, age, gender });// the rest is not required
    if (!createUser) {
        res.json({ message: "error while creating the user" })
    }
    const token = await jwt.sign({ email: signUpEmail }, process.env.CONFIRM_EMAIL_SIGN, { expiresIn: 60 * 60 });
    const refreshToken = await jwt.sign({ email: signUpEmail }, process.env.CONFIRM_EMAIL_SIGN, { expiresIn: 60 * 60 * 24 * 30 });
    const html = `
        <h1>infinity light</h1>
        <h2>welcome ${signUpUserName}</h2>
        <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>confirm email</a>
        <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${refreshToken}'>resend email confirmation</a>`;

    await SendEmail(signUpEmail, html);
    return res.status(201).json({ message: "signed up succesfuly", createUser });
};


export const signIn = async (req, res) => {
    const { signInEmail, signInPassword } = req.body;
    const user = await userModel.findOne({ email: signInEmail });
    if (!user) {
        return res.json({ message: "invalid data" });
    }
    const checkPassword = await bcrypt.compare(signInPassword, user.password);
    if (!checkPassword) {
        return res.json({ message: "invalid data" })
    }
    if (user.confirmEmail == false) {
        return res.json({ message: "plz confirm your email" });
    }
    const token = jwt.sign({ id: user._id }, process.env.LOG_IN_SIGN, { expiresIn: "2hr" });
    return res.json({ message: " loged in successfully ", token });
};


export const confirmEmail = async (req, res) => {
    const { token } = req.params;
    const decodedToken = jwt.verify(token, process.env.CONFIRM_EMAIL_SIGN)
    const user = await userModel.updateOne({ email: decodedToken.email }, { confirmEmail: true });
    if (user.modifiedCount > 0) {
        return res.redirect("https://www.shutterstock.com/image-photo/donkey-isolated-on-white-background-600nw-1800052597.jpg"); // fronEnd login page
    }
};

const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    return randomPassword;
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Generate a random password
    const newPassword = generateRandomPassword();

    const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALTROUND));

    const updatedUser = await userModel.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });

    // Sending an email with the new password
    const html = `
        <h1>Infinity Light</h1>
        <p>Your new password is: ${newPassword}</p>
        <p>Please use this password to login and consider changing it after logging in.</p>`;

    await SendEmail(email, html);

    return res.status(200).json({ message: "Email sent with new password" });
};


