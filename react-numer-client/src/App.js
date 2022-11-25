import 'bootstrap/dist/css/bootstrap.css';
import React,{useState,useEffect} from 'react'
import Bisection from './component/Root of Equation/Bisection';
import FalsePosition from './component/Root of Equation/False-position';
import Onepoint from './component/Root of Equation/Onepoint';
import { Route ,Switch ,Link,BrowserRouter} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,NavDropdown,Button} from 'react-bootstrap'
import Newton from './component/Root of Equation/Newton';
import Secant from './component/Root of Equation/Secant';
import Cramer from './component/Linear Algebraic Equations/Cramer';
import GaussElimenation from './component/Linear Algebraic Equations/Gauss_Elimenation';
import GaussJordanl from './component/Linear Algebraic Equations/Gauss_Jordan';
import Lu from './component/Linear Algebraic Equations/Lu';
import Cholesky from './component/Linear Algebraic Equations/Cholesky'
import Jacobi from './component/Linear Algebraic Equations/Jacobi'
import GaussSeidel from './component/Linear Algebraic Equations/Gauss_Seidel';
import Conjugate from './component/Linear Algebraic Equations/Conjugate';
import Login from './component/user/login';
import Register from './component/user/Register';
import Dashboard from './component/user/Dashboard';
import Newtondivided from './component/Interpolation/Newton_divided';
import Lagrange from './component/Interpolation/Lagrange';
import Splines from './component/Interpolation/Spline';
// import './App.css'




const App = () => {

  const [email, setEmail] = useState(null)

  const logout = () =>{
    localStorage.removeItem('token')
    window.location.href = '/Bisection'
  }

  async function populateQuote() {
    if(localStorage.getItem('token')){

		const req = await fetch('http://localhost:1337/api', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()

    // console.log(data)
        
		if (data.status === 'ok') {
			setEmail(data.email)
		}
	}
}
  useEffect(() => {
        populateQuote()
	}, [])

  return (  
    <BrowserRouter>
      
    <div>
    <Nav className="justify-content-center" defaultActiveKey="/Bisection" as="ul">
  <NavDropdown title="Root Of Equations" id="nav-dropdown">
        <NavDropdown.Item as={Link} to="/Bisection">Bisection</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/False-Position">False Position</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Onepoint">Onepoint</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Newton" >Newton</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Secant">Secant</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Linear Algebraic Equations" id="nav-dropdown">
        <NavDropdown.Item as={Link} to="/Cramer" >Cramer</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Gauss_Elimenation">Gauss Elimenation</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Gauss_Jordanl">Gauss Jordanl</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Lu">Lu</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Cholesky">Cholesky</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/Jacobi">Jacobi</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Gauss_Seidel">Gauss Seidel</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Conjugate">Conjugate</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Interpolation And Extrapolation" id="nav-dropdown">
        <NavDropdown.Item as={Link} to="/Newton_divided" >Newton_divided</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Lagrange" >Lagrange</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Spline" >Spline</NavDropdown.Item>
      </NavDropdown>

      {email == null && (
      <div>
      <NavDropdown title="User" id="nav-dropdown">
        <NavDropdown.Item as={Link} to="/Login" >Login</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Register">Register</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/Dashboard">Dashboard</NavDropdown.Item>
      </NavDropdown>
      </div>
      )}

{email !== null && (
      <div>
      {email} 
      <Button
          type="button"
          onClick={logout} >
          Logout
      </Button>
      </div>
      )}

</Nav>
  </div>
    <div>
      <Switch>
				<Route exact path="/"><Bisection/></Route>
            <Route path="/Bisection" ><Bisection/></Route>
            <Route path="/False-Position"><FalsePosition/></Route>
            <Route path="/Onepoint"><Onepoint/></Route>
            <Route path="/Newton"><Newton/></Route>
            <Route path="/Secant"><Secant/></Route>
            <Route path="/Cramer"><Cramer/></Route>
            <Route path="/Gauss_Elimenation" ><GaussElimenation/></Route>
            <Route path="/Gauss_Jordanl"><GaussJordanl/></Route>
            <Route path="/Lu"><Lu/></Route>
            <Route path="/Cholesky"><Cholesky/></Route>
            <Route path="/Jacobi"><Jacobi/></Route>
            <Route path="/Gauss_Seidel"><GaussSeidel/></Route>
            <Route path="/Conjugate" ><Conjugate/></Route>
            <Route path="/Login" ><Login/></Route>
            <Route path="/Register" ><Register/></Route>
            <Route path="/Dashboard" ><Dashboard/></Route>
            <Route path="/Newton_divided" ><Newtondivided/></Route>
            <Route path="/Lagrange" ><Lagrange/></Route>
            <Route path="/Spline" ><Splines/></Route>
      </Switch>
		  </div>
    
      </BrowserRouter>
  );
}

// const App = () =>{

//   const Bisection = (event) => {
//     event.preventDefault();
//     console.log(event.target.value);
//   };

//   return (
//     <div>
//       <Form onSubmit={Bisection}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control type="email" placeholder="Enter email" />
//             <Form.Text className="text-muted">
//               We'll never share your email with anyone else.
//             </Form.Text>
//         </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//   </Form>
//   </div>
//   )
// }

export default App;
