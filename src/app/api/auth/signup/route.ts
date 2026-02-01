import { NextRequest, NextResponse } from "next/server"

type FormData = {
    email: string,
    username: string,
    password: string
}

export async function POST(req:NextRequest) {
    const data:FormData = await req.json()
    return NextResponse.json({
        message: `User ${data.username} signed up successfully with email ${data.email}`
    })
}

