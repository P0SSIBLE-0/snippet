import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { connectToDatabase } from '@/lib/mongodb'
import Snippet from '@/models/Snippet'

export async function GET() {
  try {
    await connectToDatabase()
    const { userId } = auth()
    console.log(userId)
    
    let snippets;
    if (userId) {
      // Fetch public snippets and private snippets owned by the user
      snippets = await Snippet.find({userId, $or: [{ userId }, { isPublic: true }] }).sort({ createdAt: -1 });
    } else {
      // Fetch only public snippets for unauthenticated users
      snippets = await Snippet.find({ isPublic: true }).sort({ createdAt: -1 });
    }
    
    return NextResponse.json(snippets);
  } catch {
    return NextResponse.json({ error: 'Error fetching snippets' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectToDatabase()
    const data = await request.json()
    const newSnippet = new Snippet({ ...data, userId })
    await newSnippet.save()
    return NextResponse.json(newSnippet, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error creating snippet' }, { status: 500 })
  }
}