import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { PeopleAttribute } from './[id]'

interface Props {}

/**
 * Go to localhost:port/star-wars
 */
const StarWars: NextPage = ({}) => {
  const [resData, setResData] = useState<PeopleAttribute[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then(x => x.json())
      .then(json => setResData(json.results))
      .catch(err => {
        setIsError(true)
        console.error(err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <p className="font-bold text-blue-600">Loading...</p>
  if (isError) return <p className="font-bold text-rose-600">Something error.</p>
  if (!resData) return <p className="font-bold text-rose-600">Data not found.</p>

  return (
    <div className='flex flex-col gap-4'>
      {resData.map(person => (
        <div>
          <p>Name: {person.name}</p>
          <p>
            Details:{' '}
            <a
              href={person.url}
              target="_blank"
              className="text-emerald-600 underline hover:text-emerald-500"
            >
              {person.url}
            </a>
          </p>
        </div>
      ))}
    </div>
  )
}

export default StarWars
