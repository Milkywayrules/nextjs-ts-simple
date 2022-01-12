import type { NextPage } from 'next'
import SimpleButton from '../components/SimpleButton'
import SimpleForm from '../components/SimpleForm'

const Home: NextPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>;
      {/* call this button component */}
      <SimpleButton />
      {/* wrapper for form */}
      <div className="w-1/2 p-10 mt-5 border shadow lg:w-1/3">
        <h2 className="text-lg font-semibold">Fill out the form, bro</h2>
        <div className="mt-2"></div>
        {/* form component example */}
        <SimpleForm />
      </div>
    </>
  )
}

export default Home
