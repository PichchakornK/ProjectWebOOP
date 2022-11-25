import React, { useState } from "react";
import { addStyles, EditableMathField,StaticMathField } from "react-mathquill";
import {Form,Button,Row,Col,Table,Accordion,Container} from 'react-bootstrap'
import {evaluate,derivative} from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,ResponsiveContainer,Tooltip } from 'recharts';
addStyles()

const Newton = () => {

  const [data, setData] = useState({
    x: 0,
    eq: '',
    error: 0,
})

    const [result, setresult] = useState(null)    
    const [latex, setLatex] = useState("");
    // const [check,setcheck] = useState(null)
    const [xmx, setxmx] = useState(null)  
    const [ans, setans] = useState(null)  
    const [equation, setEquation] = useState();

    const Cal_Newton = () =>{
        
        let cal = (x) => {
           let a = latex.toString();
        
            return evaluate(a, { x })
        }

        let diff = (x) => {
            let a = derivative(latex,'x').toString()
            return evaluate(a, { x })
        }
        let eq = latex;

        let x = data.x;
        let xn=0;
        let i=0;
        let er = 1;
        let results = []
        let fx;
    
        do{

            // if((cal(xl) > 0 && cal(xr) > 0) || (cal(xl) < 0 && cal(xr) < 0)){
            //     setcheck(false)
            //     alert("y ของ xl หรือ xr มีค่าไม่ตรงข้ามกัน")
            //     break;
            // }

            xn = x - cal(x)/diff(x);
            er = Math.abs((xn-x)/xn);
            x = xn;
            fx = cal(x)
            i++;

            results.push({
                iteration: i,
                x: x.toFixed(8),
                fx: fx.toFixed(8),
                er: er.toFixed(8)
            })
            
        }
        while (er >= data.error)
        //prove
        let fx1 = cal(x)
        console.log(fx1)
        console.log("latex"+latex)
        console.log("eq"+eq)
        console.log("xm"+x)
        setans(fx1)
        setxmx(x)
        setresult(results)
        setEquation(eq)

        fetch('http://localhost:1337/api', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		}).then((res) => res.json())
            .then((json) => {
                console.log(json)
                if(json.status ==='ok'){
                    fetch('http://localhost:1337/api/root/newton', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': localStorage.getItem('token'),
                        },
                        body: JSON.stringify({
                            eq:eq,
                            x:x,
                            er:er,
                        }),
                    })
                }
            });

    }

   

    // console.log(equation)

     

  return (
    <div className="container mt-6">
        <Container className="mt-5 p-4 rounded bg-light">
                <h2>Newton Method</h2>
                <Form>
                    <Form.Group as={Row} controlId="Equation">
                        <Form.Label column sm="2">
                            Equation
                        </Form.Label>

                        {/* <EquationEditor
                        placehoder
                        value={equation}
                        onChange={setEquation}
                        autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
                        autoOperatorNames="sin cos tan"
                    /> */}

                        {/* <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setEquation(e.target.value)
                                }}
                            />
                            {equation} */}

                        <EditableMathField className="form-control"
                            latex={latex}
                            onChange={(mathField) => {
                                setLatex(mathField.latex());
                            }}
                        />

                        {/* <math-field id="formula"></math-field> */}

                    </Form.Group>
                    <Form.Group as={Row} controlId="X">
                        <Form.Label column sm="2">
                            X 
                        </Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        x: parseFloat(e.target.value),
                                    })
                                }}
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Row} controlId="Error">
                        <Form.Label column sm="2">
                            Error
                        </Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        error: parseFloat(e.target.value),
                                    })
                                }}
                            />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col>
                            <Button
                                type="button"
                                onClick={Cal_Newton} >
                                Calculate
                            </Button>
                        </Col>
                    </Form.Group> 
                </Form>
            </Container>

                {result !== null && (
                    <div class="pt-4">
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Result Table </Accordion.Header>
                            <Accordion.Body>
                            <Table  bordered hover >
                            <thead>
                                <tr>
                                    <th>Iteration</th>
                                    <th>Fx</th>
                                    <th>X</th>
                                    <th>ERROR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((g) => (
                                    <tr key={g.iteration}>
                                        <td>{g.iteration}</td>
                                        <td>{g.fx}</td>
                                        <td>{g.x}</td>
                                        <td>{g.er}</td>
                                    </tr>
                                ))}
                            </tbody>                           
                            </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Graph</Accordion.Header>
                            <Accordion.Body>
                                <ResponsiveContainer   aspect={2}>
                                <LineChart data={result} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <Line type="monotone" dataKey="fx" stroke="#8884d8"  />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <XAxis  
                                        dataKey={'x'}  
                                        name='stature'  
                                        padding={{ left: 25, right: 20 }}
                                    />
                                    <YAxis domain={['auto', 'auto']} />
                                    <Tooltip />
                                </LineChart>
                                </ResponsiveContainer>
                                </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Prove</Accordion.Header>
                            <Accordion.Body>
                                <div className="pd-6">
                                แทนค่า {xmx}
                                </div>
                                <div class="pt-2 ps-5 ms-5">
                                <StaticMathField >{equation}</StaticMathField>= 0 
                                </div>
                                <div>
                                <StaticMathField >{ans}</StaticMathField>= 0
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    
        </div>
        )}
   
        </div>
        

  );
}

export default Newton;

