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

  const router = useRouter()
  const pathname = router.pathname

  return (
    <>
      <div className="flex flex-col gap-4">
        {resData.map(person => (
          <>
            <PersonInfo key={person.url} person={person} />
            <div>
              <Link href={buildUrl(pathname, getSlug(person.url))}>
                <a className="text-emerald-600 underline hover:text-emerald-500">
                  {buildUrl(pathname, getSlug(person.url))}
                </a>
              </Link>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default StarWars
