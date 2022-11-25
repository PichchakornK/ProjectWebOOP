import {Form,Row,Col,Container} from 'react-bootstrap'
import React, { useState, useRef, useEffect } from "react";
import { subtract,multiply,transpose,add } from 'mathjs'


const Conjugate = () =>{

    const [matrixSize, setMatrixSize] = useState({
        rows: 2,
        columns: 2,
      })

      const rowsRef = useRef();
      const columnsRef = useRef()

      useEffect(() => {
        setMatrixSize({
          ...matrixSize,
          columns:matrixSize.rows
        }
      )
        columnsRef.current.value = matrixSize.rows;
        },[matrixSize, matrixSize.rows]);

        useEffect(() => {
          setMatrixSize({
            ...matrixSize,
            rows:matrixSize.columns
          }
        )
        rowsRef.current.value = matrixSize.columns;
          },[matrixSize, matrixSize.columns]);

        let matrix = Array(matrixSize.rows)
        var B = Array(matrixSize.rows).fill(0)
        var x = Array(matrixSize.rows).fill(0)


      for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
      }

      const [result, setresult] = useState(null)

      const handleMatrix = event => {
        event.preventDefault();
        let count = 0;
        for (let i = 0; i < matrixSize.rows; i++) {
          for (let j = 0; j < matrixSize.columns; j++) {

            matrix[i][j] =parseFloat(event.target[count].value)
            // matrix[i][j] = !isNaN(parseFloat(event.target[count].value)) ? parseFloat(event.target[count].value) : 0;
            count += 1;
          }

          B[i] = parseFloat(event.target[count].value)
          count += 1;
        }
        for (let k = 0; k < matrixSize.rows; k++){
            x[k] = parseFloat(event.target[count].value)
            count += 1;
        }
        console.log(x)
        // for(let k=0; k< matrixSize.rows; k++){
        //   matrix[k][matrixSize.rows] = output[k]
        // }

        console.log("matrix",matrix)
        console.log("B",B)
        Cal_Conjugate();
      }

      const Cal_Conjugate = () =>{

        var R = subtract(multiply(matrix, x), B)
        var D =  multiply(R, -1)
        let err = 1
        while (err > 0.0001) {
            var l =
                multiply(multiply(transpose(D), R), -1) /
                multiply(multiply(transpose(D), matrix), D)

            x = add(x, multiply(l, D))
            R = subtract(multiply(matrix, x), B)
            err = Math.sqrt(multiply(transpose(R), R))
            var a1 =
                multiply(multiply(transpose(R), matrix), D) /
                multiply(transpose(D), multiply(matrix, D))
            D = add(multiply(R, -1), multiply(a1, D))
            
            console.log("x = ",x)
            console.log("err = ",err)
            console.log("-----------------------------------------")

        }
      console.log(x)
      setresult(x)

      }

    return (
        <div className="container mt-8">
           <Container className="mt-5 p-4 rounded bg-light">
            <h2> Conjugate Gradient Method</h2>

            <Form.Group as={Row} controlId="XL">
                        <Form.Label column sm="1">
                              Size Matrix:
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control
                                className='col-4'
                                type="number"
                                ref={rowsRef}
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
                        <Form.Label column sm="1">
                            X
                        </Form.Label>
                        <Col md={2}>  
                            <Form.Control
                                className='col-4'
                                type="number"
                                ref={columnsRef}
                                    onChange={e => {
                                        const columns = parseInt(e.target.value)
                                        // if we only want matrix of size between 2 and 8
                                        if (2 <= columns && columns <= 8) {
                                        setMatrixSize(prevSize => ({
                                            ...prevSize,
                                            columns: columns,
                                        }))
                                        }
                                    }}
                            />
                        </Col>
                </Form.Group>

                <div className="mt-4">
                <form onSubmit={handleMatrix}>
                  {matrix.map((row, indexRow = 1) => {
                    return (
                      <div className="d-flex" >
                        <div mr={20}>
                          {row.map((item, indexColumn = 1) => {
                            return (
                              <div className="d-inline-block">
                              <Form.Control
                              required
                              placeholder={"A"+indexRow + indexColumn}
                                key={indexRow + " " + indexColumn}
                                name={indexRow + "," + indexColumn}
                              />
                              </div>
                            )
                          })}
                        </div>
                       <p className='ms-3 me-3'> = </p> 
                    <div ml={5}>
                      <Form.Group as={Row} ml={3} className="mb-2 sm-2">
                        <Col sm="10">
                          <Form.Control
                            required
                              placeholder={"B"+indexRow}
                                key={indexRow}
                                name={indexRow}
                              />
                        </Col>
                      </Form.Group>
                    </div>
                      </div>
                      
                    )
                  })} 
                  <h4>Start value of X </h4>
                  {matrix.map((row, indexRow = 1) => {
                    return (
                      <div className="d-inline-block" >
                    <Form.Group as={Row} className="mb-2 sm-2">
                      <Col sm="10">
                        <Form.Control
                          required
                            placeholder={"X"+indexRow}
                              key={indexRow}
                              name={indexRow}
                            />
                      </Col>
                    </Form.Group>
                        
                      </div>
                      
                    )
                  })} 
                  <button className="btn btn-primary">{"Calculate"}</button>
                </form>
                </div>
              </Container>
              <div className='col-mt-6'>
              {result !== null && (
                <div>
                    {result.map((x,index) => (
                      
                      <Container className="mt-2 p-4 round bg-light">
                      <h3>X{index}: {x}</h3>
                      </Container>
                  
                    ))}   
                </div>                     
              )}
              </div>

                  
        </div>
    )

}

export default Conjugate;