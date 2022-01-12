import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import EmptyMessage from '../../components/EmptyMessage'
import ErrorMessage from '../../components/ErrorMessage'
import LoadingMessage from '../../components/LoadingMessage'
import PersonInfo from '../../components/PersonInfo'
import { PersonAttribute } from './star-wars'

interface Props {}

const fetchPerson = async () => {
  const res = await fetch(`https://swapi.dev/api/people`)
  return await res.json()
}

/**
 * Go to localhost:port/star-wars
 */
const StarWars: NextPage = ({}) => {
  const [resData, setResData] = useState<PersonAttribute[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    // fetch data and then set result into state
    fetchPerson()
      .then(json => setResData(json.results))
      .catch(err => {
        setIsError(true)
        console.error(err)
      })
      .finally(() => setIsLoading(false))
  }, []) // depends on empty array, only run once on componentDidMount lifecycle

  if (isLoading) return <LoadingMessage />
  if (isError) return <ErrorMessage />
  if (!resData) return <EmptyMessage />

  return (
    <div className="flex flex-col gap-4">
      {resData.map(person => (
        <PersonInfo key={person.url} person={person} />
      ))}
    </div>
  )
}

export default StarWars
