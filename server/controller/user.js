import User from '../models/user.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect credentials." });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });

    res.status(200).json({ result: existingUser, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }

}

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exist." });

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bycrypt.hash(password, 12);

    const createdUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, 'test', { expiresIn: '1h' });

    res.status(200).json({ result: createdUser, token })

  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}