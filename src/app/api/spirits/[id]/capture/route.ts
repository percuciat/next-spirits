import { NextRequest, NextResponse } from 'next/server';
import { spirits } from '../../data';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 30% chance of failure
  if (Math.random() < 0.3) {
    return NextResponse.json(
      {
        success: false,
        message: 'Capture failed! The spirit escaped.',
      },
      { status: 500 }
    );
  }

  const spiritIndex = spirits.findIndex((s) => s.id === id);
  
  if (spiritIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        message: 'Spirit not found.',
      },
      { status: 404 }
    );
  }

  const spirit = spirits[spiritIndex];
  
  if (spirit.status === 'Captured') {
    return NextResponse.json(
      {
        success: false,
        message: 'Spirit is already captured.',
      },
      { status: 400 }
    );
  }

  // Update spirit status
  spirits[spiritIndex] = {
    ...spirit,
    status: 'Captured',
    lastSeen: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    spirit: spirits[spiritIndex],
    message: `${spirit.name} has been captured!`,
  });
}
