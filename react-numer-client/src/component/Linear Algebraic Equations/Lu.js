import {Form,Row,Col,Container} from 'react-bootstrap'
import React, { useState, useRef, useEffect } from "react";

const Lu = () =>{

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

      for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
        output[i] = new Array(matrixSize).fill(0)
      }

      const [result, setresult] = useState(null)
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
        // for(let k=0; k< matrixSize.rows; k++){
        //   matrix[k][matrixSize.rows] = output[k]
        // }

        console.log("matrix",matrix)
        Cal_Lu();
      }

      const Cal_Lu = () =>{
        let n = matrixSize.rows;
         var lower = Array(n).fill(0).map(
          x => Array(n).fill(0));
         var upper = Array(n).fill(0).map(
          x => Array(n).fill(0));

        var Y = Array(n).fill(0)
        var X = Array(n).fill(0)
        var B = Array(n).fill(0)


        // Decomposing matrix into Upper and
        // Lower triangular matrix
        for(var i = 0; i < n; i++)
        {
            // Lower Triangular
            for(var k = i; k < n; k++)
            {      
                    // Summation of L(k, j) * U(j, i)
                    var sum = 0;
                    for(var j = 0; j < i; j++){
                        sum += (lower[k][j] * upper[j][i]);
                        // console.log("sum2 ",sum,j)
                    }

                    // Evaluating L(k, i)
                    lower[k][i] = matrix[k][i] - sum
                    // console.log('lower '+ lower)
            }
              
            // Upper Triangular
            // eslint-disable-next-line no-redeclare
            for(var k = i; k < n; k++)
            {
                if (i === k){
                    upper[i][i] = 1;
                }  
                else
                {
                    // eslint-disable-next-line no-redeclare
                    var sum = 0;
                    // eslint-disable-next-line no-redeclare
                    for(var j = 0; j < i; j++){
                        sum += (lower[i][j] * upper[j][k]);
                        // console.log("sum1 ",sum,j)
                    }
        
                    // Evaluating U(i, k)
                    upper[i][k] = (matrix[i][k] - sum) /lower[i][i];
                    // console.log('upper ' + upper +' '+ k)
                }
            }

        }

      //  console.log('lower2 '+ lower)
      //  console.log('upper2 ' + upper)

        // eslint-disable-next-line no-redeclare
        for(var i = 0; i<n;i++){
            var diff = matrix[i][n];
            B[i] =  matrix[i][n];
            tabs.push({
              i:k
          })
            // eslint-disable-next-line no-redeclare
            for(var j=0;j<i;j++){

                if(j !== i){
                    diff -= lower[i][j]*Y[j]
                }
            }
            Y[i] = diff/lower[i][i];

        }
        // console.log("Y"+Y)

        // eslint-disable-next-line no-redeclare
        for(var i = n-1; i>=0;i--){
            // eslint-disable-next-line no-redeclare
            var diff = Y[i]

            // eslint-disable-next-line no-redeclare
            for(var j=n-1;j>=0;j--){

                if(j !== i){
                    diff -= upper[i][j]*X[j]
                }
            }
            X[i] = diff/upper[i][i];

        }
          // console.log("X"+X)
          setresult(X)
        
      }

    return (
        <div className="container mt-8">

            <h2> Lu Method</h2>

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
                  <button className="btn btn-primary">{"Calculate"}</button>
                </form>
                </div>

              <div className='col-mt-6'>
              {result !== null && (
                <div>
                    {result.map((x,index) => (
                      <Container className="mt-5 p-4 round bg-light">
                      
                    <h3>X{index}: {x}</h3>

                    </Container>
                  
                    ))}   
                </div>                     
              )}
              </div>

                  
        </div>
    )

}

export default Lu;