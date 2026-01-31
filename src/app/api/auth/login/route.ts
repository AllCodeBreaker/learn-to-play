import { NextRequest, NextResponse } from "next/server"

type FormData = {
    username: string,
    password: string
}

export async function POST(req:NextRequest) {
    const data:FormData = await req.json()
    return NextResponse.json({
        name: data.username,
        password: data.password
    })
}

