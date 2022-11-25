const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');

const interpolation_route = express.Router()


// interpolation_route.post("/newton",(req,res)=>Newtondivied(req,res))
// interpolation_route.post("/lagrange",(req,res)=>Lagrange(req,res))
// interpolation_route.post("/spline",(req,res)=>Splineinterpo(req,res))





module.exports = interpolation_route;