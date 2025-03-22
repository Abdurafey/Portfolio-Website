import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const blogs = await Blog.find(query);
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const blog = await Blog.create(data);
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}