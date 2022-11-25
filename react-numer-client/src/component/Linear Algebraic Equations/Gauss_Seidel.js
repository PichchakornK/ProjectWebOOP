import {Form,Row,Col,Table,Container} from 'react-bootstrap'
import React, { useState, useRef, useEffect } from "react";


const GaussSeidel = () =>{

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

        let matrix = Array(matrixSize.rows+1)
        let X = Array(matrixSize.rows)

      for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
        X = new Array(matrixSize).fill(0)
      }

      const [result, setresult] = useState(null)
      const [tab, settab] = useState(null)
      const [answer, setanswer] = useState(null)
      let tabs = [];

      const handleMatrix = event => {
        event.preventDefault();
        let count = 0;
        for (let i = 0; i < matrixSize.rows; i++) {
          for (let j = 0; j < matrixSize.columns; j++) {

            matrix[i][j] =parseFloat(event.target[count].value)
            // matrix[i][j] = !isNaN(parseFloat(event.target[count].value)) ? parseFloat(event.target[count].value) : 0;
            count += 1;
          }

          matrix[i][matrixSize.rows] = parseFloat(event.target[count].value)
          count += 1;
        }
        for (let i = 0; i < matrixSize.rows; i++){
            X[i] = parseFloat(event.target[count].value);
            count += 1;
            tabs.push({
                i:i
            })
        }
        settab(tabs)
          tab.map((g) => (
            console.log(g.i)
        ))
        // for(let k=0; k< matrixSize.rows; k++){
        //   matrix[k][matrixSize.rows] = output[k]
        // }

        console.log("matrix",matrix)
        console.log("X",X)
        Cal_Seidal();
      }

      const Cal_Seidal = () =>{
          let error,d,i=1;
          let n = matrixSize.rows;
          let ans = Array(matrixSize.rows)
          let results = [];

          for(let j=0;j<n;j++){
              ans[j] = X[j];
          }
          
          do{

            for(let j=0;j<n;j++){
                d = matrix[j][n];

                for(let i=0;i<n;i++){
                    if(j !== i){
                        d-= matrix[j][i]*ans[i];
                    }
                
                }
            ans[j] = d/matrix[j][j];
            }
            //หา error
            error=0;
            let test = Array(matrixSize.rows)
            for(let j=0;j<n;j++){
                if(Math.abs((ans[j]-X[j])/ans[j]) < 0.000001){
                    error+=1;
                }
                X[j] = ans[j];
                test[j] = ans[j];
            }
            results.push({
                iteration: i,
                x:test
            })
            i+=1;
          }
          while(error !== n)
          setanswer(test)
          setresult(results)
        //   console.log("result"+result)
        //   result.map((g) => (
        //     console.log(g.x)
        // ))
      }

      

    return (
      <div className="container mt-8">
      <Container className="mt-5 p-4 rounded bg-light">
        <h2> Gauss Seidel iteration Method</h2>

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
            {result !== null && (
              <div>
                {answer.map((x,index) => (
                  <Container className="mt-5 p-4 round bg-light">
                <h3>X{index}: {x}</h3>
                </Container>
              
                ))}  
                    <Table  bordered hover >
                    <thead>
                        <tr>
                            <th>Iteration</th>
                            {tab.map((a) => (
                                <th>X{a.i}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((g) => (
                            <tr key={g.iteration}>
                                <td>{g.iteration}</td>
                                {g.x.map((a,index) => (
                                    <td>{g.x[index]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>                           
                </Table>
              </div>
                )}


    </div>
    )

}

export default GaussSeidel;