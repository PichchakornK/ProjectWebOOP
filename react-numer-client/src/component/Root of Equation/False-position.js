import React, { useState } from "react";
import { addStyles, EditableMathField,StaticMathField } from "react-mathquill";
import {Form,Button,Row,Col,Table,Accordion,Container} from 'react-bootstrap'
import {evaluate} from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,ResponsiveContainer,Tooltip } from 'recharts';
addStyles()

const FalsePosition = () => {

  const [data, setData] = useState({
    xl: 0,
    xr: 0,
    eq: '',
    error: 0,
})

    const [result, setresult] = useState(null)    
    const [latex, setLatex] = useState("");
    // const [check,setcheck] = useState(null)
    const [xmx, setxmx] = useState(null)  
    const [ans, setans] = useState(null)  
    const [equation, setEquation] = useState();

    const Cal_False = () =>{
        
        let cal = (x) => {
           let a = latex.toString();
        
            return evaluate(a, { x })
        }
        let eq = latex;
        let BiData = [];
        let xl = data.xl;
        let xr = data.xr;
        BiData.push({
            eq,xl,xr
        })
        let xm=0;
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

            xm = (xl*cal(xr) - xr*cal(xl))/ (cal(xr) - cal(xl));
            fx = cal(xm)
            if (fx === 0.0){
                break;
            }
    
            else if (fx*cal(xr) < 0){
                er = Math.abs((xm-xl)/xm);
                xl = xm;
            }
    
            else{
                er = Math.abs((xr-xm)/xm);
                xr = xm;
            }
            i++;

            results.push({
                iteration: i,
                xl: xl.toFixed(6),
                xr: xr.toFixed(6),
                fx: fx.toFixed(8),
                xm: xm.toFixed(8),
                er: er.toFixed(8)
            })
            
        }
        while (er >= data.error)
        //เก็บdata api er,xm
        BiData.push({
            er,xm
        })

        //prove
        let fx1 = cal(xm)
        console.log(fx1)
        console.log("latex"+latex)
        console.log("eq"+eq)
        console.log("xm"+xm)
        setans(fx1)
        setxmx(xm)
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
                    fetch('http://localhost:1337/api/root/False', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': localStorage.getItem('token'),
                        },
                        body: JSON.stringify({
                            eq:BiData[0].eq,
                            xl:BiData[0].xl,
                            xr:BiData[0].xr,
                            er:BiData[1].er,
                            xm:BiData[1].xm
                        }),
                    })
                }
            });

}

  return (
    
    <div className="container mt-6">
        <Container className="mt-5 p-4 rounded bg-light">
                <h2>False Position Method</h2>
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
                    <Form.Group as={Row} controlId="XL">
                        <Form.Label column sm="2">
                            XL
                        </Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        xl: parseFloat(e.target.value),
                                    })
                                }}
                            />
                    </Form.Group>
                    <Form.Group as={Row} controlId="XR">
                        <Form.Label column sm="2">
                            XR
                        </Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        xr: parseFloat(e.target.value),
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
                                onClick={Cal_False} >
                                Calculate
                            </Button>
                        </Col>
                    </Form.Group> 
                </Form>
            </Container>

                {result !== null && (
                    <div className="pt-4">
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Result Table </Accordion.Header>
                            <Accordion.Body>
                                <Table  bordered hover >
                                <thead>
                                    <tr>
                                        <th>Iteration</th>
                                        <th>XL</th>
                                        <th>XR</th>
                                        <th>XM</th>
                                        <th>Fx</th>
                                        <th>ERROR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.map((g) => (
                                        <tr key={g.iteration}>
                                            <td>{g.iteration}</td>
                                            <td>{g.xl}</td>
                                            <td>{g.xr}</td>
                                            <td>{g.xm}</td>
                                            <td>{g.fx}</td>
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
                                        dataKey={'xm'}  
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

export default FalsePosition;

