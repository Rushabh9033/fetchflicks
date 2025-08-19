import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const videoUrl = new URL(request.url).searchParams.get("videoUrl");
  if (!videoUrl) {
    return NextResponse.json({ error: "Video URL is required" }, { status: 400 });
  }

  // Call your Flask backend or a public API for YouTube download
  // Example: fetch(`http://localhost:5000/download?videoUrl=${videoUrl}`)
  // For demo, just return the URL
  return NextResponse.json({ download: videoUrl }, { status: 200 });
}
