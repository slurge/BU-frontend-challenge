import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function intToChar(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i);
}

const Department = ({index, data}) => {
  return (
    <div className="container p-3 my-4 p-md-4 department">
      <h3>Departamento {intToChar(index)}</h3>
      <p>{data[index]}</p>
      <hr />
      <div className="text-end">total</div>
    
    </div>
  )
}

function App() {
  //const [departments, setDepartments] = useState({});
  const [departments, dataHandler] = useState([
      'a', 'c'
  ]);
  const [newName, setNewname] = useState('');

  return (
    <div className="App">
      <header >
        <div className="container d-flex align-items-center justify-content-start h-100">
          <button className='btn btn-primary py-2 px-4'><i class="bi bi-plus-lg"></i> Agregar departamento</button>
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
