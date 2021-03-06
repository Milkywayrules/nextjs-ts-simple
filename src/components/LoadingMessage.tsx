import { FC } from 'react'

interface Props {}

const LoadingMessage: FC<Props> = ({}) => {
  return <p className="font-bold text-blue-400">Loading...</p>
}

export default LoadingMessage
