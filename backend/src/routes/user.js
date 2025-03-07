import express from 'express';
import User from '../models/user.js';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/register', async (req, res) => {
	try{
		const {email, password} = req.body;

		const existingUser = await User.findOne({email:email});
		if(existingUser) return res.status(400).json({message:'Email already used'});

		const newUser = new User({email, password});
		await newUser.save();

		res.status(200).json({message:'User registered successfully'});
	}
	catch(err){
		res.status(500).json({message:err.message});
	}
});

router.post('/login', async (req, res) => {
	try{
		const {email, password} = req.body;

		// Check if email exists
		const user = await User.findOne({email:email});
		if(!user) return res.status(400).json({message:'Invalid credentials'});

		// Check password is correct
		const isMatch = await user.comparePassword(password);
		if(!isMatch) return res.status(400).json({message:'Invalid credentials'});

		const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,  {expiresIn:'1h'});
		res.status(200).json({token});
	}
	catch(err){
		res.status(500).json({message:err.message});
	}
});

export default router;