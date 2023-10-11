"use client"

import { cn } from '@/lib/utils'
import { User } from '@prisma/client'
import { Edit, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EmployeeCard({
  className,
  employee
}:{
  className?: string,
  employee: User
}) {

  const router = useRouter()

  return (
    <div className={cn("w-full rounded bg-zinc-100 dark:bg-zinc-900 overflow-hidden", className)}>
      <div className='px-3  py-1 flex justify-between bg-zinc-200 dark:bg-zinc-800 space-x-1'>
        <button>
          <X className='text-red-500 inline' />
        </button>
        <button onClick={()=>router.push(`/users/${employee.id}/edit`)}>
          <Edit size={19} className='my-auto' />
        </button>
      </div>
      <Link href={`${process.env.NEXT_PUBLIC_URL}/users/${employee.id}`} className='grid grid-cols-10 p-3'>
        <div className='w-32 h-32 rounded bg-zinc-500 col-span-4'>
          {/* IMAGE CONTAINER */}
        </div>
        <div className='col-span-6'>
          {/* DETAILS CONTAINER */}
          <p className='text-xs truncate'>{employee.id}</p>
          <p className='truncate'>{employee.fullName}</p>
          <p className='truncate'>{employee.position}</p>
        </div>
      </Link>
    </div>
  )
}
