import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import NotAllowedAlert from '@/app/not-allowed';
import { verifyAccessRole } from '@/lib/utils';
import { getServerSession } from 'next-auth'
import React from 'react'
import CreateUserForm from './CreateUserForm';

const ROLES_ALLOWED = [
  "SUPERUSER",
  "USERMANAGER"
]

export default async function CreateUsersPage() {

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
        <div className="container mx-auto mt-10 p-3">
          <h1 className="text-2xl font-medium">Create User</h1>
          <CreateUserForm />
        </div>
      }
    </>
  )
}

