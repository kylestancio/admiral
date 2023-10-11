import React from 'react'
import EmployeesContainer from './EmployeesContainer'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { verifyAccessRole } from '@/lib/utils';
import NotAllowedAlert from '../not-allowed';

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
        <div className='container mx-auto mt-10'>
          <h1 className='text-2xl font-medium'>Employees</h1>
          <EmployeesContainer />
        </div>
      }

    </>
  )
}
