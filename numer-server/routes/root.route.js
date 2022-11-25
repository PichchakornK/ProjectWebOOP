const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const root_route = express.Router()

//  mongoose.connect('mongodb://localhost:27017/full-mern-stack')
mongoose.connect('mongodb://mongo:27017/full-mern-stack')


root_route.post("/Bisection", async (req,res)=>{
    console.log(req.body)
	if(req.headers['x-access-token']){
		const token = req.headers['x-access-token']

		try {
			const decoded = jwt.verify(token, 'secret123')
			const email = decoded.email
			await User.updateOne(
				{ email: email },
				// { $set: { quotea: req.body.quote } },
				{ $set: {Bisection:{
					eq:req.body.eq,
					xl:req.body.xl,
					xr:req.body.xr,
					er:req.body.er,
					x:req.body.xm} 
				} }
			)

			return res.json({ status: 'ok' })
		} catch (error) {
			console.log(error)	
			res.json({ status: 'error', error: 'invalid token' })
		}
	}

	res.json({ status: 'error', error: 'dont have token' })
	})

root_route.post("/False", async (req,res)=>{

	if(req.headers['x-access-token']){
		console.log(req.body)
		const token = req.headers['x-access-token']

		try {
			const decoded = jwt.verify(token, 'secret123')
			const email = decoded.email
			
			await User.updateOne(
				{ email: email },
				// { $set: { quotea: req.body.quote } },
				{ $set: {False_position:{
								eq:req.body.eq,
								xl:req.body.xl,
								xr:req.body.xr,
								er:req.body.er,
								x:req.body.xm}
				} } 
			)

			return res.json({ status: 'ok' })
		} catch (error) {
			console.log(error)	
			res.json({ status: 'error', error: 'invalid token' })
		}
	}

	res.json({ status: 'error', error: 'dont have token' })
})

root_route.post("/onepoint",async (req,res)=>{
	if(req.headers['x-access-token']){
		console.log(req.body)
		const token = req.headers['x-access-token']

		try {
			const decoded = jwt.verify(token, 'secret123')
			const email = decoded.email
			await User.updateOne(
				{ email: email },
				// { $set: { quotea: req.body.quote } },
				{ $set: {Onepoint:{
					eq:req.body.eq,
					er:req.body.er,
					x:req.body.x} 
				} }
			)

			return res.json({ status: 'ok' })
		} catch (error) {
			console.log(error)	
			res.json({ status: 'error', error: 'invalid token' })
		}
	}

	res.json({ status: 'error', error: 'dont have token' })
})

root_route.post("/newton",async (req,res)=>{
	if(req.headers['x-access-token']){
		console.log(req.body)
		const token = req.headers['x-access-token']

		try {
			const decoded = jwt.verify(token, 'secret123')
			const email = decoded.email
			await User.updateOne(
				{ email: email },
				// { $set: { quotea: req.body.quote } },
				{ $set: {Newton:{
					eq:req.body.eq,
					er:req.body.er,
					x:req.body.x} 
				} }
			)

			return res.json({ status: 'ok' })
		} catch (error) {
			console.log(error)	
			res.json({ status: 'error', error: 'invalid token' })
		}
	}

	res.json({ status: 'error', error: 'dont have token' })
})

root_route.post("/secant",async (req,res)=>{
	if(req.headers['x-access-token']){
		console.log(req.body)
		const token = req.headers['x-access-token']

		try {
			const decoded = jwt.verify(token, 'secret123')
			const email = decoded.email
			await User.updateOne(
				{ email: email },
				// { $set: { quotea: req.body.quote } },
				{ $set: {Secant:{
					eq:req.body.eq,
					er:req.body.er,
					x:req.body.x} 
				} }
			)

			return res.json({ status: 'ok' })
		} catch (error) {
			console.log(error)	
			res.json({ status: 'error', error: 'invalid token' })
		}
	}

	res.json({ status: 'error', error: 'dont have token' })
})

module.exports = root_route;