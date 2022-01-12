import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Props {}

/**
 * Because we fetch data from /people endpoint
 */
export interface PeopleAttribute {
  name: string
  url: string
}

interface NotFoundApiResponse {
  detail: string
}

type ApiResponse = PeopleAttribute | NotFoundApiResponse

/**
 * Go to localhost:port/star-wars/77
 */
const StarWars: NextPage = ({}) => {
  const router = useRouter()
  const { id } = router.query

  const [resData, setResData] = useState<ApiResponse>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (id) {
      fetch(`https://swapi.dev/api/people/${id}`)
        .then(x => x.json())
        .then(json => setResData(json))
        .catch(err => {
          setIsError(true)
          console.error(err)
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  if (isLoading) return <p className="font-bold text-blue-600">Loading...</p>
  if (isError) return <p className="font-bold text-rose-600">Something error.</p>
  if (!resData) return <p className="font-bold text-rose-600">Data not found.</p>

  /**
   * do a type check/property check using in (typescript), inside the ternary operator
   * we do this to get autocompletion and type checking that correct.
   *
   * if we directly using "resData" without conditional like this,
   * TS will be confused whether "FoundApiResponse | NotFoundApiResponse" is the value.
   *
   * "NotFoundApiResponse" has detail property that others dont have,
   * so it's unique and TS is smart enough to parse the rest of the value.
   *
   * ex.
   * return (true/false) ? ifTrue : ifFalse
   */
  return 'detail' in resData ? (
    <div>{resData.detail}</div>
  ) : (
    <div>
      <p>Name: {resData.name}</p>
      <p>
        Details:{' '}
        <a
          href={resData.url}
          target="_blank"
          className="text-emerald-600 underline hover:text-emerald-500"
        >
          {resData.url}
        </a>
      </p>
    </div>
  )
}

export default StarWars
