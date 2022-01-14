import type { NextPage } from 'next'
import SimpleButton from '../components/SimpleButton'
import SimpleForm from '../components/SimpleForm'

const Home: NextPage = () => {
  return (
    <>
      <nav className="bg-gray-600 rounded">
        <ul className="flex gap-3 text-gray-300 justify-evenly">
          <li className="px-4 py-2 hover:text-white">Home</li>
          <li className="px-4 py-2 hover:text-white">Btn Comp</li>
          <li className="px-4 py-2 hover:text-white">Star wars people</li>
        </ul>
      </nav>

      {/* simple button component demo */}
      <section className="p-2 mt-5 bg-gray-700 shadow">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <SimpleButton />
      </section>

      {/* simple form demo */}
      <section className="flex justify-center p-2 mt-5 bg-gray-700 shadow">
        <div className="w-9/12 p-10 bg-gray-900 shadow md:w-1/2 lg:w-1/3">
          <h2 className="text-lg font-semibold">Fill out the form, bro</h2>
          <div className="mt-2"></div>
          <SimpleForm />
        </div>
      </section>
    </>
  )
}

export default Home
