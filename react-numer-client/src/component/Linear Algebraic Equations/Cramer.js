import {Form,Row,Col,Container} from 'react-bootstrap'
import React, { useState, useRef, useEffect } from "react";
import {det} from 'mathjs'

const Cramer = () =>{

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
        let output = Array(matrixSize.rows)

      for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
        output[i] = new Array(matrixSize).fill(0)
      }

      const [result, setresult] = useState(null)
      const [prove, setprove] = useState(null)
      const [pro, setpro] = useState(null)

      const handleMatrix = event => {
        event.preventDefault();
        let count = 0;
        //รับค่า matrix
        for (let i = 0; i < matrixSize.rows; i++) {
          for (let j = 0; j < matrixSize.columns; j++) {

            matrix[i][j] =parseFloat(event.target[count].value)
            // matrix[i][j] = !isNaN(parseFloat(event.target[count].value)) ? parseFloat(event.target[count].value) : 0;
            count += 1;
          }

          output[i] = parseFloat(event.target[count].value)
          count += 1;
        }
        console.log("matrix",matrix,output)
        Cal_Cramer();
      }

      const Cal_Cramer = () =>{
          let ans = Array(matrixSize.rows)
          let a = Array(matrixSize.rows)
          
          for (let i = 0; i < matrixSize.rows; i++) {
            a[i] = new Array(matrixSize.columns).fill(0)
          }

          for (let k = 0; k < matrixSize.rows; k++){
            //เช็คค่า det
            if(det(matrix) === 0){
              alert("Det Matrix = 0")
              break;
            }

            //coppy matrix
            for (let i = 0; i < matrixSize.rows; i++) {
              for (let j = 0; j < matrixSize.columns; j++) {
                a[i][j] = matrix[i][j]
              }
            }

            //หา a มาแทนค่า
            let l=0;
            while (l < matrixSize.rows) {
              a[l][k] = output[l]
              l++;
            }

            //หาค่า x
            ans[k] = det(a)/det(matrix)
          }
          console.log("ans1",ans)

          //ตรวจคำตอบ 
          let prove1 = 0;
          for (let k = 0; k < matrixSize.rows; k++){
            prove1+= matrix[0][k]*ans[k]
          }
          let pro1 = output[0]
          setprove(prove1)
          setpro(pro1)
          setresult(ans)
          console.log("result",result)

      }

    return (
        <div className="container mt-5">
        <Container className="mt-5 p-4 rounded bg-light">
            <h2>Cramer's Rule</h2>
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
                                    if (2 <= rows && rows <= 10) {
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
                                        if (2 <= columns && columns <= 10) {
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
                  <button className="btn btn-primary">{"Calculate"}</button>
                </form>
                </div>
                </Container>

              <div className='col-mt-6'>
              {result !== null && (
                
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
                            {prove} = {pro}
                        </h3> 
                        
                     </Container>
                </div>                     
              )}
              </div>

                  
        </div>
    )

}

export default Cramer;