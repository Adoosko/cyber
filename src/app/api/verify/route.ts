import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No reCAPTCHA token provided" },
        { status: 400 }
      );
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA configuration error" },
        { status: 500 }
      );
    }

    // Use reCAPTCHA v2 verification endpoint
    const verifyEndpoint = "https://www.google.com/recaptcha/api/siteverify";

    const response = await fetch(verifyEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      const errorMessage =
        "reCAPTCHA verification failed: " +
        (data["error-codes"]?.join(", ") || "unknown error");
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
