import {Form,Row,Col,Table,Container} from 'react-bootstrap'
import React, { useState, useRef, useEffect } from "react";

const GaussElimenation = () =>{

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
        
        //ประกาศ matrix
        let matrix = Array(matrixSize.rows+1)
        let output = Array(matrixSize.rows)

      for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
        output[i] = new Array(matrixSize).fill(0)
      }

      const [result, setresult] = useState(null)
      const [tab, settab] = useState(null)
      const [matrixs, setmatrixs] = useState(null)
      const [prove, setprove] = useState(null)
      const [pro, setpro] = useState(null)
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

          output[i] = parseFloat(event.target[count].value)
          count += 1;
        }
        for(let k=0; k< matrixSize.rows; k++){
          matrix[k][matrixSize.rows] = output[k]
        }

        console.log("matrix",matrix)
        Cal_Gauss();
      }

      const Cal_Gauss = () =>{
        let ans = Array(matrixSize.rows)

        const fowardElimina = () =>{
          
          for(let k=0 ; k< matrixSize.rows; k++){
  
            let i_max = k;
            let v_max = matrix[i_max][k];
            let i;

            tabs.push({
              i:k
          })

            for (i = k+1; i < matrixSize.rows; i++){
              if(Math.abs(matrix[i][k]) > v_max){
                v_max = matrix[i][k];
                 i_max = i;
              }
            }

            for (i=k+1; i<matrixSize.rows; i++){
                let f = matrix[i][k]/matrix[k][k];
                for (let j=k+1; j<=matrixSize.rows; j++)
                matrix[i][j] -= matrix[k][j]*f;
                matrix[i][k] = 0;
		        }

          }
        }

        const backSub = () =>{

          for (let i = matrixSize.rows-1; i >= 0; i--){
            ans[i] = matrix[i][matrixSize.rows];

            for (let j=i+1; j<matrixSize.rows; j++){
              ans[i] -= matrix[i][j]*ans[j];
            }

            ans[i] = ans[i]/matrix[i][i];
          }

          
        }
        fowardElimina()
        backSub()
        settab(tabs)
        console.log(ans)

        //ตรวจคำตอบ 
        let prove1 = 0;
        for (let k = 0; k < matrixSize.rows; k++){
          prove1+= matrix[0][k]*ans[k]
        }
        let pro1 = output[0]
        setprove(prove1)
        setpro(pro1)

        setresult(ans)
        setmatrixs(matrix)
        console.log(ans)
        console.log("mat"+matrixs)

      }

    return (
        <div className="container mt-8">
          <Container className="mt-5 p-4 rounded bg-light">
            <h2>Gauss Elimination Method</h2>

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
                    <Col md={{ span: 5, offset: 3 }}>
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
                    </Col>
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
                            {prove} = {pro}
                        </h3> 
                        
                     </Container>
                </div>
                </div>                     
              )}
              </div>

                  
        </div>
    )

}

export default GaussElimenation;