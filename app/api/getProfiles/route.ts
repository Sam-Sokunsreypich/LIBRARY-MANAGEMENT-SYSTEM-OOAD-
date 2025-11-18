import { NextResponse } from "next/server";
import { getUserLoggedInInfo } from "@/app/auth/actions";

export async function GET() {
  try {
    const res = await getUserLoggedInInfo();

    if (!res) {
      // No user info found
      console.error("Failed to fetch profile info");
      return NextResponse.json(
        { error: "Failed to fetch profile info" },
        { status: 404 }
      );
    }

    // Success
    return NextResponse.json(res, { status: 200 });

  } catch (error) {
    console.error("Error fetching profile info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
