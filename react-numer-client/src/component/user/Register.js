import { useState } from 'react'
import {Form,Col,Container} from 'react-bootstrap'

function Register() {

  const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

  async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()
    	console.log(data)
		
		if (data.status === 'ok') {
			window.location.href = '/Login'
		}
	}

  return (
		<div>
			<Container className="mt-5 p-4 rounded bg-light justify-content-md-center">
			<h1>Register</h1>
			<form onSubmit={registerUser}>
			<Form.Label column sm="1">
                    Name:
            </Form.Label>
			<Col md={4}>
				<Form.Control
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
			</Col>
				<br />
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
				<br />
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
				<br />
			</Col>
			<button className="btn btn-primary mt-3 col-2">{"register"}</button>
			</form>
			</Container>
		</div>
	)
}

export default Register;
