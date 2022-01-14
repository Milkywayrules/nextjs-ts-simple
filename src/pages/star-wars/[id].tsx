import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PersonInfo from '../../components/PersonInfo'
import { ApiResponse } from './star-wars'

interface Props {}

const fetchPerson = async (id: string) => {
  const res = await fetch(`https://swapi.dev/api/people/${id}`)
  return await res.json()
}

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
    if (router.isReady) {
      const newIds = Array.isArray(id) ? (id.length < 1 ? null : id[0]) : id

      if (!newIds) {
        setIsError(true)
        setIsLoading(false)
        return
      }

      // fetch data and then set result into state
      fetchPerson(newIds)
        .then(json => setResData(json))
        .catch(err => {
          setIsError(true)
          console.error(err)
        })
        .finally(() => setIsLoading(false))
    }
  }, [router.isReady]) // depends on empty array, only run once on componentDidMount lifecycle

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
    <PersonInfo key={resData.url} person={resData} />
  )
}

export default StarWars
