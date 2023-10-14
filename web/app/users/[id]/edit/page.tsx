import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import NotAllowedAlert from '@/app/not-allowed';
import prisma from '@/lib/prisma';
import { verifyAccessRole } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import React from 'react'
import EditUserForm from './EditUserForm';
import { User } from '@prisma/client';

interface UserWithoutPassword extends Omit<User, 'password'>{}

const ROLES_ALLOWED = [
  "SUPERUSER",
  "USERMANAGER"
]

export default async function EditUserPage({params}:{params:{id:string}}) {

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
            <div className="container mx-auto mt-10 p-3">
              <h1 className="text-2xl font-medium">Edit Employee</h1>
              <p className="text-zinc-500 font-bold text-sm">{employee.id}</p>
              <EditUserForm user={employee} />
            </div>
          }
        </>
      }
    </>
  )
}
