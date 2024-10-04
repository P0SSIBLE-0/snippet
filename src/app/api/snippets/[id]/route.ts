import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { connectToDatabase } from '@/lib/mongodb'
import Snippet from '@/models/Snippet'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const snippet = await Snippet.findById(params.id)
    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 })
    }
    return NextResponse.json(snippet)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching snippet' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectToDatabase()
    const data = await request.json()
    const snippet = await Snippet.findOneAndUpdate(
      { _id: params.id, userId },
      { ...data, updatedAt: new Date() },
      { new: true }
    )

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found or unauthorized' }, { status: 404 })
    }

    return NextResponse.json(snippet)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating snippet' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectToDatabase()
    const snippet = await Snippet.findOneAndDelete({ _id: params.id, userId })

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found or unauthorized' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Snippet deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting snippet' }, { status: 500 })
  }
}