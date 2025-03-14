import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Read() {
    const {id} = useParams();
    const [employee, setEmployee] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {
          console.log(res)
          setEmployee(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounder p-3'>
        <div className='p-2'>
          <h2>Employee Detail</h2>
          <h2>{employee.ID}</h2>
          <h2>{employee.Name}</h2>
          <h2>{employee.Email}</h2>
        </div>
        <Link to="/" className='btn btn-primary me-2'>Back</Link>
        <Link to={`/edit/${employee.ID}`} className='btn btn-info'>Edit</Link>
      </div>
    </div>
  )
}

export default Read