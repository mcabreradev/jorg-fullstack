import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const { nextUrl: { search } } = request;
  const cache = request.nextUrl.searchParams.get('cache');
  const base_url = process.env.AIRLAB_API_BASE;
  const api_key = process.env.AIRLAB_API_KEY;
  // const cache_expiration = process.env.CACHE_EXPIRATION || 3600 * 24; // 24 hours
  const symbol = search ? '&' : '?';
  const url = `${base_url}/${slug}${search}${symbol}api_key=${api_key}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: cache ? cache as RequestCache : 'force-cache',
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.error();
  }
  return NextResponse.json(data.response);
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const { nextUrl: { search } } = request;
  const body = await request.json();
  const base_url = process.env.AIRLAB_API_BASE;
  const api_key = process.env.AIRLAB_API_KEY;
  const symbol = search ? '&' : '?';
  const url = `${base_url}/${slug}${search}${symbol}api_key=${api_key}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.error();
  }

  return NextResponse.json(data.response)
}