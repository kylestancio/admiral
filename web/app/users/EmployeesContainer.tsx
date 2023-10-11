"use client"

import React, { useEffect, useState } from 'react'
import EmployeeCard from './EmployeeCard'
import { User } from '@prisma/client'
import { Loader2, XCircle } from 'lucide-react'

export default function EmployeesContainer() {

  const [employees, setEmployees] = useState<User[]>()
  const [error, setError] = useState(false)

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/list`)
    .then(res=>res.json())
    .then(data=>setEmployees(data))
    .catch(_=>setError(true))
  }, [])

  return (
    <>
      { !employees && !error && 
        <p className='mt-5'><Loader2 className='animate-spin inline me-2' />Loading...</p>
      }

      { !employees && error && 
        <p className='mt-5'><XCircle className='inline me-2' />Something went wrong in getting the data.</p>
      }

      { employees && employees.length===0 && 
        <p className='mt-5'>No employees found.</p>
      }
      
      { employees && employees.length > 0 && 
        <div className='mt-5 grid grid-cols-4 gap-3'>
          { employees.map(employee=>(
            <EmployeeCard key={employee.id} employee={employee} />
          ))
          }
        </div>
      }
    </>
  )
}
