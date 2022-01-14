import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import EmptyMessage from '../../components/EmptyMessage'
import ErrorMessage from '../../components/ErrorMessage'
import LoadingMessage from '../../components/LoadingMessage'
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

  if (isLoading) return <LoadingMessage />
  if (isError) return <ErrorMessage />
  if (!resData) return <EmptyMessage />

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
  return (
    <>
      <button onClick={() => router.push('/star-wars')}>Go to list</button>
      <h1 className="mb-5 text-2xl font-bold">Star Wars Person</h1>
      {'detail' in resData ? (
        <div>{resData.detail}</div>
      ) : (
        <PersonInfo key={resData.url} person={resData} />
      )}
    </>
  )
}

export default StarWars
