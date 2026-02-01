
// Minimal API route to satisfy Next.js build
export async function GET() {
	return new Response(JSON.stringify({ message: "ok" }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	})
}

