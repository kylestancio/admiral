import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  try{
    const query = await prisma.user.findMany()

    //* REMOVE PASSWORD
    const cleanedQuery = query.map(user=>{
      const {password, ...userWithoutPassword} = user;
      return userWithoutPassword
    })

    return NextResponse.json(cleanedQuery);
    
  }catch(err){
    //* LOG ERROR IN SERVER
    console.error(err)

    //* CREATE GENERIC ERROR OBJECT
    const errorObject = {
      error: "Unknown Error",
      message: "Something went wrong"
    }

    //* RETURN A GENERAL ERROR
    return NextResponse.json(errorObject, {
      status: 500,
    })
  }
}