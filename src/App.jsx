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

function getTotal(data){
  let total = 0;
  Object.keys(data).forEach(key => {
    if(typeof(data[key]) === 'string') {
      total += allocation[data[key]];
    } else {
      if (Object.keys(data[key])[0] === 'Manager') {
        total += allocation['Manager'];
      }
      total += getTotal(data[key]);
    }
  });
  return total;
}


const Employee = ({index, data, handler}) => {

  const employeeName = typeof(data) === 'string' ? data : Object.keys(data)[0];
  const employeeAllocation = allocation[employeeName];
  const isManager = employeeName === 'Manager';

  return(
    <div className="employee w-100">
      <div className="d-flex justify-content-between">
        <div>
          {employeeName}
        </div>
        <div>
          $ {employeeAllocation} 
        </div>
      </div>
      
      {
        isManager && 
        data['Manager'].map((emp, index) => 
          <div key={index} className="d-flex">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Employee index={index} data={emp} handler={handler}/>
          </div>
        )
      }

    </div>
  )
}


const Department = ({index, data, handler}) => {

  const deleteDepartment = () => {
    handler([...data.slice(0, index), ...data.slice(index + 1)]);
  }

  return (
    <div className="container p-3 my-4 p-md-4 department">
      <div className="d-flex justify-content-between align-items-center">
        <h3>
          {Object.keys(data[index])[0]}
        </h3>
        <button onClick={deleteDepartment} className='btn'><i className="bi bi-trash"></i></button>
      </div>
      
      <div className="">
        {data[index][Object.keys(data[index])[0]].map((emp, index) => <Employee key={index} index={index} data={emp} handler={handler}/>)}
      </div>
      
      <hr />
      <div className="text-end">Total: $ {getTotal(data[index][Object.keys(data[index])[0]])}</div>
    
    </div>
  )
}

function App() {
  const [departments, dataHandler] = useState([
      {
        'Departamento 1': [
          {
            'Manager':['Developer', 'QA Tester', {
              'Manager':[]
            },]
          },
          'Developer'
        ]
      },
      {'Departamento 2': []}
  ]);

  const [newName, setNewName] = useState('');

  const addDepartment = () => {
    if(newName.length > 0) {
      dataHandler([...departments, {[newName]:[]}]);
      setNewName('');
    }
  }

  return (
    <div className="App">
      <header >
        <div className="container d-flex align-items-start justify-content-center flex-column h-100">
          <h2>Add a department</h2>
          <div>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <button onClick={addDepartment} className='boton px-2 py-1 ms-2'><i className="bi bi-plus-lg"></i></button>
          </div>
        </div>
      </header>

      <div className="container-fluid maincont py-3">

        {
          departments.map(
            (_, index) => <Department index={index} key={index} data={departments} handler={dataHandler} /> 
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
