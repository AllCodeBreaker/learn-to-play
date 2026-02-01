import CodeEditor from "@/components/CodeEditor"

type Params = {
  params: {
    id: string
  }
}

export default async function Challenge(props: Promise<Params> | Params) {
  const resolved = await props
  // `params` itself can be a Promise in some Next.js environments — await it just in case.
  const maybeParams = (resolved as any).params
  const params = await maybeParams
  const rawId = params.id
  const parsed = Number(rawId)
  const id = Number.isFinite(parsed) ? parsed : rawId

  return (
    <>
      <h2>Challenge Page</h2>
      <p>
        This page contains actual challenge detailed description, code editor,
        samples, hints, etc.
      </p>
      <p>Challenge ID: {id}</p>
  <CodeEditor value={`// Write your solution for challenge ${id} here`} />
    </>
  )
}
