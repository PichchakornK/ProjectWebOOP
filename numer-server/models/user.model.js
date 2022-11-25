
const { number } = require('mathjs')
const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		quote: { type: String },
		Bisection: {
			eq: {type: String},
			xl:{type:number},
			xr:{type:number},
			er:{type:number},
			x:{type:number}},
		False_position:{
			eq: {type: String},
			xl:{type:number},
			xr:{type:number},
			er:{type:number},
			x:{type:number}
			},
		Onepoint:{
			eq: {type: String},
			er:{type:number},
			x:{type:number}
			},
		Newton:{
			eq: {type: String},
			er:{type:number},
			x:{type:number}
			},
		Secant:{
			eq: {type: String},
			er:{type:number},
			x:{type:number}
			}

		
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model