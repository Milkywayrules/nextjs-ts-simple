import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
 * Get slug from url last parameter.
 *
 * possible format:
 * - 'https://swapi.dev/api/people/1/'
 * - 'https://swapi.dev/api/people/1'
 *
 * @param str string from url that have a slug as last param
 * @returns slug from url last param
 */
const getSlug = (str: string) => {
  const [x, y] = str.split('/').slice(-2)

  if (y) return y
  return x
}

/**
 * Build url with pathname and slug.
 *
 * @param pathname url pathname
 * @param slug url slug
 * @returns builded pathname + slug
 */
const buildUrl = (pathname: string, slug: string) => `${pathname}/${slug}`

/**
 * Go to localhost:port/star-wars
 */
const StarWars: NextPage = ({}) => {
  const [resData, setResData] = useState<PersonAttribute[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const router = useRouter()
  const pathname = router.pathname

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
    <>
      <div>
        <button onClick={() => router.push('/')}>Go to home</button>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Star Wars People</h1>

        {resData.map(person => (
          <span
            key={person.url}
            className="max-w-md px-4 py-2 border border-gray-200 rounded shadow min-w-fit hover:border-indigo-400"
          >
            <PersonInfo key={person.url} person={person} />
            <div>
              On app:{' '}
              <Link href={buildUrl(pathname, getSlug(person.url))}>
                <a className="underline text-emerald-600 hover:text-emerald-500">
                  {buildUrl(pathname, getSlug(person.url))}
                </a>
              </Link>
            </div>
          </span>
        ))}
      </div>
    </>
  )
}

export default StarWars
