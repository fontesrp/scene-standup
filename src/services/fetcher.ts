const fetcher = async (input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, init)

  if (!res.ok) {
    const errorData = await res.json()
    const error = new Error(JSON.stringify(errorData))
    throw error
  }

  return res.json()
}

export default fetcher
