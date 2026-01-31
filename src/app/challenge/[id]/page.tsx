type Params = {
  params: {
    id: string
  }
}

export default function Challenge({ params }: Params) {
  const id = Number(params.id)

  return (
    <>
      <h2>Challenge Page</h2>
      <p>
        This page contains actual challenge detailed description, code editor,
        samples, hints, etc.
      </p>
      <p>Challenge ID: {id}</p>
    </>
  )
}
