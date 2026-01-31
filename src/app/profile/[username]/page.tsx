// Profile Page /profile/<username:string>

type Params = {
  params: {
    username: string
  }
}

export default function Profile({ params }: Params) {
  return <h1>Name: {params.username}</h1>
}
