import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path");

  // Default fallback secret for local dev if not defined in env
  const expectedSecret = process.env.REVALIDATION_SECRET || "revalidate-secret";

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (path) {
    try {
      revalidatePath(path);
      console.log(`[Revalidation] Path revalidated successfully: ${path}`);
      return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ revalidated: false, message: "Missing path param" }, { status: 400 });
}
