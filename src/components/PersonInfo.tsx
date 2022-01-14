import { FC } from 'react'
import { PersonAttribute } from '../pages/star-wars/star-wars'

interface Props {
  person: PersonAttribute
}

const PersonInfo: FC<Props> = ({ person }) => {
  return (
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
  )
}

export default PersonInfo
