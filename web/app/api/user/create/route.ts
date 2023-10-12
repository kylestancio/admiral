import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Prisma, User, UserRole } from "@prisma/client";
import { verifyAccessRole } from "@/lib/utils";
import * as bcrypt from 'bcrypt'

const ROLES_ALLOWED = [
  "SUPERUSER",
  "USERMANAGER"
]

interface UserWithoutPassword extends Omit<User, 'password'>{}

export async function POST(req: NextRequest){
  try{
    //* CHECK IF USER IS LOGGED IN
    const session = await getServerSession(authOptions)
    if (!session) throw "NoSessionException"

    //* CHECK IF USER HAS CORRECT ROLES
    const user:UserWithoutPassword = session.user
    if (!verifyAccessRole(ROLES_ALLOWED, user.roles)) throw "RoleNotAllowed"

    const body = await req.formData()

    //* CREATE THE USER
    await prisma.user.create({
      data: {
        username: body.get('username') as string,
        password: bcrypt.hashSync('1234', 10),
        fullName: body.get('fullName') as string,
        address: body.get('address') as string,
        phone: body.get('phone') as string || null,
        email: body.get('email') as string || null,
        position: body.get('position') as string,
        avatarLink: body.get('avatarLink') as string,
        birthday: new Date(body.get('birthday') as string),
        employmentDate: new Date(body.get('employmentDate') as string),
        roles: (body.get('roles') as string).split(',') as UserRole[],
      }
    })

    return NextResponse.json({
      message: "User creation success"
    })

  }catch(err:any){
    //* LOG ERROR IN SERVER
    console.error(err)

    //* CREATE GENERIC ERROR OBJECT
    const errorObject = {
      error: "Unknown Error",
      message: "Something went wrong"
    }

    if (err==='NoSessionException'){
      errorObject.error = err
      errorObject.message = "User is not logged in"
    }

    if (err==="RoleNotAllowed"){
      errorObject.error = err
      errorObject.message = "User does not have the correct role"
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        errorObject.error = 'User exists'
        errorObject.message = 'A user exist with the same username and/or email.'
      }
    }

    //* RETURN A GENERAL ERROR
    return NextResponse.json(errorObject, {
      status: 500,
    })
  }
}