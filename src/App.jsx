import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

const allocation = {
  'Developer' : 1000,
  'QA Tester' : 500,
  'Manager'   : 300,
}

function intToChar(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i);
}

  const Department = ({index, data, handler}) => {

  const deleteDepartment = () => {
    handler([...data.slice(0, index), ...data.slice(index + 1)]);
  }

  return (
    <div className="container p-3 my-4 p-md-4 department">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Departamento {intToChar(index)}</h3>
        <button onClick={deleteDepartment} className='btn'><i className="bi bi-trash"></i></button>
      </div>
      
      <hr />
      <div className="text-end">total</div>
    
    </div>
  )
}

function App() {
  const [departments, dataHandler] = useState([
      'a', 'c'
  ]);

  const addDepartment = () => {
    dataHandler([...departments, {}]);
  }

  return (
    <div className="App">
      <header >
        <div className="container d-flex align-items-center justify-content-start h-100">
          <button onClick={addDepartment} className='btn btn-primary py-2 px-4'><i className="bi bi-plus-lg"></i> Agregar departamento</button>
        </div>
      </header>

      <div className="container-fluid maincont py-3">

        {
          departments.map(
            (_, index) => <Department index={index} data={departments} handler={dataHandler} /> 
          )
        }

        {
          Object.keys(departments).length === 0 && 
          <div className="container p-3 p-md-4 department text-center">
            <h4>Start by adding a department</h4>
          </div>
        }

      </div>

    </div>
  )
}

export default App
