import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { verifyAccessRole } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import NotAllowedAlert from '@/app/not-allowed';
import prisma from '@/lib/prisma';
import { Edit, X } from 'lucide-react';
import Link from 'next/link';
import { User } from '@prisma/client';

interface UserWithoutPassword extends Omit<User, 'password'>{}

const ROLES_ALLOWED = [
  "SUPERUSER",
  "USERMANAGER"
]

export default async function EmployeeDetailsPage({
  params
}:{
  params:{
    id: string
  }
}) {

  const session = await getServerSession(authOptions)
  const user = session ? session.user : null;
  const userCanAccess = verifyAccessRole(ROLES_ALLOWED, user?.roles)

  const employee = await prisma.user.findFirst({
    where: {
      id: params.id
    },
    select: {
      address: true,
      avatarLink: true,
      birthday: true,
      createdAt: true,
      email: true,
      employmentDate: true,
      extendedDetails: true,
      fullName: true,
      id: true,
      phone: true,
      position: true,
      roles: true,
      status: true,
      updatedAt: true,
      username: true,
    }
  }) as UserWithoutPassword

  return (
    <>
      { !session && 
        <div>Not logged in</div>
      }

      { session && session.user && !userCanAccess &&
        <NotAllowedAlert />
      }

      { session && session.user && userCanAccess &&
        <>
          { !employee && 
            <div className='w-screen h-[calc(100vh-3.5rem)] flex'>
              <p className='m-auto'>Employee does not exist</p>
            </div>
          }

          { employee && 
            <div className='container mx-auto mt-10 p-3'>
              <div className='flex justify-between'>
                <div>
                  <h1 className='text-2xl font-medium'>{employee.fullName}</h1>
                  <p className='text-zinc-500'>{employee.id}</p>
                  <p className='text-zinc-500'>{employee.status}</p>
                </div>
                <div className=''>
                  {/* ADD "EDIT" BUTTON HERE */}
                  <Link 
                    href={`${process.env.NEXT_PUBLIC_URL}/users/${params.id}/edit`}
                    className='px-2 py-1 bg-zinc-950 text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300 rounded-md flex'>
                    <Edit className='inline me-2' />
                    Edit
                  </Link>
                </div>
              </div>
              <div className='mt-5 grid grid-cols-12 gap-5'>
                <div className='col-span-2 relative w-56 h-56 bg-zinc-500 rounded-lg'>
                {/* IMAGE CONTAINER */}
                </div>
                <div className='col-span-10 p-3 grid grid-cols-4'>
                  <div>
                    <p className='text-sm font-bold'>Username</p>
                    <p>{employee.username}</p>
                  </div>
                  <div>
                    <p className='text-sm font-bold'>Position</p>
                    <p>{employee.position}</p>
                  </div>
                  <div>
                    <p className='text-sm font-bold'>Email</p>
                    <p>{employee.email}</p>
                  </div>
                  <div>
                    <p className='text-sm font-bold'>Phone</p>
                    <p>{employee.phone}</p>
                  </div>
                  <div className='col-span-full'>
                    <p className='text-sm font-bold'>Address</p>
                    <p>{employee.address}</p>
                  </div>
                  <div>
                    <p className='text-sm font-bold'>Birthday</p>
                    <p>{employee.birthday.toISOString().substring(0, 10)}</p>
                  </div>
                  <div>
                    <p className='text-sm font-bold'>Employment Date</p>
                    <p>{employee.employmentDate.toISOString().substring(0, 10)}</p>
                  </div>
                  <div>
                    <p className='text-sm font-bold'>Roles</p>
                    <ul className='list-inside list-disc'>{employee.roles.map(role=>{
                      return (
                        <li key={role}>{role}</li>
                      )
                    })}</ul>
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      }
    </>
  )
}
