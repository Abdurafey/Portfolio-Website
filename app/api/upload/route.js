import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filename = Date.now() + '_' + file.name;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    
    await writeFile(filepath, buffer);
    
    return NextResponse.json({ 
      message: "File uploaded successfully",
      filename: `/uploads/${filename}`
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}