import React from 'react'
import EmployeesContainer from './EmployeesContainer'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { verifyAccessRole } from '@/lib/utils';
import NotAllowedAlert from '../not-allowed';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const ROLES_ALLOWED = [
  "SUPERUSER",
  "USERMANAGER"
]

export default async function UsersPage() {

  const session = await getServerSession(authOptions)
  const user = session ? session.user : null;
  const userCanAccess = verifyAccessRole(ROLES_ALLOWED, user?.roles)

  return (
    <>
      { !session && 
        <div>Not logged in</div>
      }

      { session && session.user && !userCanAccess &&
        <NotAllowedAlert />
      }

      { session && session.user && userCanAccess && 
        <div className='container mx-auto mt-10 p-3'>
          <div className='flex justify-between'>
            <h1 className='text-2xl font-medium'>Employees</h1>
            <Link 
              href={`${process.env.NEXT_PUBLIC_URL}/users/create`}
              className='px-2 py-1 bg-zinc-950 text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300 rounded-md flex'>
              <Plus className='inline my-auto' />
              <p className='inline my-auto'>Add User</p>
            </Link>
          </div>
          <EmployeesContainer />
        </div>
      }

    </>
  )
}
