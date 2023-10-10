import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt"

export async function POST(req: NextRequest){
  try{
    const checkUser = await prisma.user.count({
      where: {
        roles: {
          has: "SUPERUSER"
        }
      }
    })

    if (checkUser>0) throw "SuperUserExistsException"

    const body:User = await req.json()
    await prisma.user.create({
      data: {
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        fullName: body.fullName,
        address: body.address,
        phone: body.phone,
        email: body.email,
        position: body.position,
        roles: ["SUPERUSER"],
        avatarLink: body.avatarLink,
        birthday: body.birthday,
        employmentDate: body.employmentDate,
      }
    })

    //* CREATE A SUPER USER HERE
    return NextResponse.json({
      message: "A superuser has been created"
    }, {
      status: 200
    })
  }catch(err){
    //* LOG ERROR IN SERVER
    console.error(err)

    //* CREATE GENERIC ERROR OBJECT
    const errorObject = {
      error: "Unknown Error",
      message: "Something went wrong"
    }

    //* IF SUPERUSER EXISTS IN THE DATABASE
    if (err==="SuperUserExistsException"){
      errorObject.error=err
      errorObject.message="A superuser already exists in the database." 
    }

    //* RETURN A GENERAL ERROR
    return NextResponse.json(errorObject, {
      status: 500,
    })
  }
}