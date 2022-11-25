const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');

const linear_route = express.Router()

// linear_route.post("/cramer",(req,res)=>Cramer(req,res))
// linear_route.post("/gausseli",(req,res)=>GaussElimination(req,res))
// linear_route.post("/gaussjor",(req,res)=>GaussJordan(req,res))
// linear_route.post("/lu",(req,res)=>LUdecomposition(req,res))
// linear_route.post("/jacobi",(req,res)=>Jacobi(req,res))
// linear_route.post("/gaussseidel",(req,res)=>GaussSeidel(req,res))
// linear_route.post("/conjugate",(req,res)=>Conjugate(req,res))




module.exports = linear_route;