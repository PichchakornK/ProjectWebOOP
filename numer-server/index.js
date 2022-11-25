const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// const swaggerJsDoc = require('swagger-jsdoc')

const swaggerUi = require('swagger-ui-express');

const linear_route = require('./routes/linear.route')
const root_route = require('./routes/root.route.js')
const interpolation_route =  require('./routes/interpolation.route.js')

var YAML = require("yamljs");
var swaggerConfig = YAML.load("./swagger.yml");

// const swaggerDocument = require('./swagger.json')

app.use(cors())
app.use(express.json()) 

//swagger 
// const swaggerOptions = {
// 	swaggerDefinition: {
// 		info: {
// 			title: 'Numer Project eiei',
// 			description: "Panupong"
// 		},
// 	basePath: '/',
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         }
//       }
//     },
//     security: [{
//       bearerAuth: []
//     }]
// 	},
// 	apis: ["./index.js"]
//   }

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// mongoose.connect('mongodb://localhost:27017/full-mern-stack')
 mongoose.connect('mongodb://mongo:27017/full-mern-stack')
 
 app.get('/test', async (req, res) => {
 
		 res.json({ status: 'ok' })
	 
 })

  
 app.post('/test', async (req, res) => {
 
	res.json({ status:req.body })

})

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})
     console.log(user)

	if (!user) {
		return res.json({ status: 'error1', error: 'Invalid login' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.get('/api', async (req, res) => {
	console.log(req.headers)
	if(req.headers['x-access-token']){
		const token = req.headers['x-access-token']

		try {
			const decoded = jwt.verify(token, 'secret123')
			const email = decoded.email
			// const user = await User.findOne({ email: email })

			return res.json({ status: 'ok', email:email })
		} catch (error) {
			console.log(error)
			res.json({ status: 'error', error: 'invalid token' })
		}
	}

	res.json({ status: 'error', error: 'dont have token' })

})
	
app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']
	console.log(req.body)

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			// { $set: { quotea: req.body.quote } },
			{ $set: {quote:req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)	
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.use("/api/root", root_route);
app.use("/api/linear", linear_route);
app.use("/api/interpolation",interpolation_route);

app.listen(1337, () => {
	console.log('Server started on 1337')
})