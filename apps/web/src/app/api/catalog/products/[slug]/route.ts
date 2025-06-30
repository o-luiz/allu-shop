import { NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = 'http://localhost:3330/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Slug é obrigatório',
        },
        { status: 400 }
      );
    }

    const proxyUrl = `${GATEWAY_URL}/catalog/products/${encodeURIComponent(
      slug
    )}`;

    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from gateway:', response.status, errorText);

      return NextResponse.json(
        {
          success: false,
          error: `Gateway error: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
