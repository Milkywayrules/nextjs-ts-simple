import { FC } from 'react'

interface Props {}

const EmptyMessage: FC<Props> = ({}) => {
  return <p className="font-bold text-orange-600">Data not found.</p>
}

export default EmptyMessage
