import { NextResponse } from 'next/server';
import { spirits } from './data';

export async function GET() {
  return NextResponse.json(spirits);
}
