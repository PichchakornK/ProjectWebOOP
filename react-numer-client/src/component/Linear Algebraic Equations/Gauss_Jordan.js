import {Form,Row,Col,Table,Container} from 'react-bootstrap'
import React, { useState, useRef, useEffect } from "react";

const GaussJordan = () =>{

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
        let output = Array(matrixSize.rows)
        let proves = Array(matrixSize.rows)

      for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
        output[i] = new Array(matrixSize).fill(0)
        proves = new Array(matrixSize).fill(0)
      }

      const [result, setresult] = useState(null)
      const [tab, settab] = useState(null)
      const [matrixs, setmatrixs] = useState(null)
      const [prove, setprove] = useState(null)
      const [proz, setproz] = useState(null)
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

          proves[i] = matrix[0][i];
          matrix[i][matrixSize.rows] = parseFloat(event.target[count].value)
          count += 1;
        }
        setproz(matrix[0][matrixSize.rows])
        // for(let k=0; k< matrixSize.rows; k++){
        //   matrix[k][matrixSize.rows] = output[k]
        // }

        console.log("matrix",matrix)
        Cal_Gauss();
      }

      const Cal_Gauss = () =>{
        let ans = Array(matrixSize.rows)
        
        const PerformOperation = () =>{
          let i, j, k = 0, c;
       
            for (i = 0; i < matrixSize.rows; i++)
            {
              tabs.push({
                i:k
            })

                if (matrix[i][i] === 0)
                {
                    c = 1;
                    while ((i + c) < matrixSize.rows && matrix[i + c][i] === 0){
                      c++;
                    }
                        
                    if ((i + c) === matrixSize.rows)
                    {
                        break;
                    }
                    for (j = i, k = 0; k <= matrixSize.rows; k++)
                    {
                        let temp =matrix[j][k];
                        matrix[j][k] = matrix[j+c][k];
                        matrix[j+c][k] = temp;
                    }
                }
          
                for (j = 0; j < matrixSize.rows; j++)
                {
                      
                    // Excluding all i == j
                    if (i !== j)
                    {
                          
                        // Converting Matrix to reduced row
                        // echelon form(diagonal matrix)
                        let p = matrix[j][i] / matrix[i][i];
          
                        for (k = 0; k <= matrixSize.rows; k++){
                          matrix[j][k] = matrix[j][k] - (matrix[i][k]) * p;  
                        }                
                                  
                    }
                }
            }

            for(i=0 ; i< matrixSize.rows;i++){
              ans[i] = matrix[i][ matrixSize.rows] / matrix[i][i];
            }

            for(i=0 ; i< matrixSize.rows;i++){
              for(let j =0;j<matrixSize.rows;j++){
                if(i===j){
                  matrix[j][j] = 1
                }
              }
              matrix[i][ matrixSize.rows] = ans[i];
            }


        }

        PerformOperation(); 
        console.log("mat"+matrix)
        settab(tabs)
        setmatrixs(matrix)
        setresult(ans)
        console.log(ans)

        let prove1 = 0;
          for (let k = 0; k < matrixSize.rows; k++){
            prove1+= proves[k]*ans[k]
          }
          setprove(prove1)

      }

      return (
        <div className="container mt-8">
           <Container className="mt-5 p-4 rounded bg-light">
            <h2>Gauss Jordan Method</h2>

            <Form.Group as={Row} controlId="XL">
                        <Form.Label column sm="1">
                              Size Matrix:
                        </Form.Label>
                        <Col md={2}>
                            <Form.Control
                                className='col-'
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
                                className='col-3'
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

                <div className="mt-3">
                <form onSubmit={handleMatrix}>
                  {matrix.map((row, indexRow = 1) => {
                    return (
                      <div className="d-flex" >
                        <div mr={20}>
                        {row.map((item, indexColumn = 1) => {
                          return (
                            <div className="d-inline-block m-1">
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
                    <Form.Group as={Row} className="mb-2 sm-2">
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
                  <button className="btn btn-primary mt-3 col-2">{"Calculate"}</button>
                </form>
                </div>
                </Container>
              <div className='mt-5'>
              {result !== null && (
                <div>
                  <div>
                  <Table  bordered hover className='col-2' >
                        <thead>
                            <tr>
                                {tab.map((a) => (
                                    <th>X{a.i}</th>
                                ))}
                                <th>B</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matrixs.map((g,index) => (
                                <tr key={g}>
                                  {g.map((a,index) =>(
                                    <td>{g[index]}</td>
                                    
                                  ))}
                                </tr>
                            ))}
                        </tbody>                       
                    </Table>
                  </div>
                  <div>
                  <Container className="mt-5 p-4 round bg-light">
                                
                        <h2>Result:</h2>
                        {result.map((x,index) => (
                          <h3 className="ms-4">               
                            X{index}= {x}
                          </h3> 
                       ))}                     
                        <h2>Prove:</h2>
                        <h3 className="ms-4">               
                            แทนค่า X ในสมการ
                        </h3> 
                        <h3 className="ms-4"> 
                            {prove} = {proz}
                        </h3> 
                        
                     </Container>
                </div>      
                </div>                     
              )}
              </div>

                  
        </div>
    )

}

export default GaussJordan;