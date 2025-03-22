import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({});
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const service = await Service.create(data);
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}