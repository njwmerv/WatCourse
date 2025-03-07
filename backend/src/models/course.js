import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
	code:{
		type:String,
		required:true
	},
	enrolled:{
		type:String,
		optional:true
	}
}, {_id:false});

const Course = mongoose.model('Course', CourseSchema);

export default Course;