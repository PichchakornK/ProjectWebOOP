import { useState } from 'react'
import {Form,Col,Container} from 'react-bootstrap'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()
        // console.log("1")
		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
        // console.log("data"+data)

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/Bisection'
		} else {
            
			alert('Please check your username and password')
		}
	}

	return (
		<div>
			<Container className="mt-5 p-4 rounded bg-light justify-content-md-center">
			<h1>Login</h1>
			<form onSubmit={loginUser} >
			<Form.Label column sm="1">
                    Email:
            </Form.Label>
			<Col md={4}>
				<Form.Control
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
			</Col>
			<br/>
			<Form.Label column sm="1">
                Password:
            </Form.Label>
				<Col md={4}>
				<Form.Control
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				</Col>
				<br />
				<button className="btn btn-primary mt-3 col-2">{"Login"}</button>
				
			</form>
			</Container>
		</div>
	)
}

export default Login