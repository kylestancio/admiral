import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  try{
    // CREATE A SUPER USER HERE
    return NextResponse.json({
      message: "A superuser has been created"
    }, {
      status: 200
    })
  }catch(err){
    console.log(err)
    // HANDLE SPECIFIC ERRORS HERE

    // RETURN A GENERAL ERROR
    return NextResponse.json({}, {
      status: 500,
    })
  }
}