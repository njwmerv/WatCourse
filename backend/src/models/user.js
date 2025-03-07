import bcrypt from 'bcrypt';
import Course from './Course.js';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email:{
		type:'String',
		unique:true,
		required:[true, 'Email is required'],
		lowercase:true,
		validate:{
			validator:(aEmail) => {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aEmail);
			},
			message:'Invalid email'
		}
	},
	password:{
		type:String,
		required:[true, 'Password is required'],
		minlength:[8, 'Password must be at least 8 characters long'],
		validate:{
			validator: (aPassword) => {
				return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(aPassword);
			},
			message:'Password must contain at least one letter, one number, and one special character',
		},
	},
	courses:{
		type:[Course.schema],
		required:true
	},
}, {timestamps:true});

UserSchema.pre('save', async (next) => {
	if(!this.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.comparePassword = async (aGuess) => {
	return await bcrypt.compare(aGuess, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;