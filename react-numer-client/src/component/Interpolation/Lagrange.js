import {Form,Row,Col,Container} from 'react-bootstrap'
import React, { useState} from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,ResponsiveContainer,Tooltip,Scatter } from 'recharts';

const Lagrange = () =>{
    const [matrixSize, setMatrixSize] = useState({
        rows: 2,
      })  

        let matrix = Array(matrixSize.rows+1)
        let X = Array(matrixSize.rows)
        let Y = Array(matrixSize.rows)
        let value;
        let results = []

      for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.rows).fill(0)
        X = new Array(matrixSize).fill(0)
        Y = new Array(matrixSize).fill(0)
      }

      const [result, setresult] = useState(null)
      const [ans, setans] = useState(null)

      const handleMatrix = event => {
        event.preventDefault();
        let count = 0;
        for (let i = 0; i < matrixSize.rows; i++) {
          X[i] = parseFloat(event.target[count].value);
          count += 1;
          Y[i] = parseFloat(event.target[count].value);
          count += 1;

        }
        value = parseFloat(event.target[count].value);

        Cal_Lagrange();
      }

      const Cal_Lagrange = () =>{
        let n = matrixSize.rows

        let sum = 0;
   
        for (let i = 0; i < n; i++)
        {
            let term = Y[i];
            for (let j = 0; j < n; j++)
            {
                if (j !== i)
                    term = term*(value - X[j]) / (X[i] - X[j]);
            }
    
            sum += term;
        }


        for (let i = 0; i < n; i++){
          results.push({
            x: X[i],
            y: Y[i]
        })

        if(value > X[i] && value < X[i+1]){
          results.push({
            x: value,
            y: sum
        })
        }
    }
        setans(sum)
        setresult(results);
      }



    

    return (
        <div className="container mt-8">
          <Container className="mt-5 p-4 rounded bg-light">
            <h2>Lagrange Interpolation</h2>

            <Form.Group as={Row} controlId="XL">
                        <Form.Label column sm="1">
                              Size Point:
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control
                                className='col-4'
                                type="number"
                                onChange={e => {
                                    const rows = parseInt(e.target.value)
                                    // if we only want matrix of size between 2 and 8
                                    if (2 <= rows && rows <= 8) {
                                    setMatrixSize(prevSize => ({
                                        ...prevSize,
                                        rows: rows,
                                    }))
                                    }
                                }}
                            />
                        </Col>
                      
                </Form.Group>

                <div className="mt-8">
                <form onSubmit={handleMatrix}>
                  {matrix.map((row, indexRow = 1) => {
                    return (
                      <div className="d-flex" >

                            <div className="d-inline-block">
                            <Form.Control
                            required
                            placeholder={"X"+indexRow }
                              key={indexRow }
                              name={indexRow }
                            />
                            </div>

                    <Form.Group as={Row} className="mb-2 sm-2">
                      <Col sm="10">
                        <Form.Control
                          required
                            placeholder={"Y"+indexRow}
                              key={indexRow}
                              name={indexRow}
                            />
                      </Col>
                    </Form.Group>
                        
                      </div>
                      
                    )
                  })} 
                  <h4>Start value of X </h4>

                  <div className="d-inline-block" >
                    <Form.Group as={Row} className="mb-2 sm-2">
                      <Col sm="10">
                        <Form.Control
                          required
                            placeholder={"Value"}
                              
                            />
                      </Col>
                    </Form.Group>
                        
                      </div>

                  <button className="btn btn-primary">{"Calculate"}</button>
                </form>
                </div>
                </Container>
                  <div>
                  {result !== null && (
                    <div>
                      <Container className="mt-5 p-4 rounded bg-light">
                        <h3>Y:{ans}</h3>
                      </Container>

                      <ResponsiveContainer  width="100%" height="100%" aspect={2}>
                          <LineChart data={result} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="y" stroke="#8884d8"  />
                              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                 <XAxis  
                                  dataKey={'x'}  
                                  name='stature'  
                                  padding={{ left: 25, right: 20 }}
                                  />
                                  <YAxis domain={['auto', 'auto']} />

                                  <Scatter dataKey="x1" fill="green" />
                                  <Tooltip />
                        </LineChart>
                      </ResponsiveContainer>
                      
                    </div>
                    
                  )
                  }
                  </div>

                  
        </div>
    )


}

export default Lagrange;