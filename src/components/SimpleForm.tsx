import { FC, useRef, useState } from 'react'

interface Props {}

const inputClassName =
  'px-3 py-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400'

/**
 * A simple form as an example that trigger onSubmit event and logging the form data.
 *
 * On the current situation we are not set any strict typescript types,
 * now is just like a normal js file. It's working because TS infer some of the types.
 */
const SimpleForm: FC<Props> = ({}) => {
  /**
   * there are 2 approach to get data from an element (like data binding)
   *  1. using ref hooks (useRef) as a reference to an element.
   *  2. using state hooks (useState) and always sync between state and user input onChange.
   *
   * By mean of getting data, is not specific to getting data on form.
   * Getting data on form is now pretty simple, use new FormData() and it's done.
   *
   * By mean of getting data, is for example, provide a preview from the user input,
   * as seen on the bottom below the submit btn. We getting data from inside to outside of the form.
   *
   * Using state hooks (useState) is more used than using useRef, but maybe it's only preferences
   * and the more detailed explanation can be found on google. lol
   */
  // 1st approach
  const firstnameRef = useRef<null | HTMLInputElement>(null) // initial value is null
  const lastnameRef = useRef(null)

  // 2nd approach
  const [usernameState, setUsernameInput] = useState('') // initial value is empty string
  const [emailState, setEmailInput] = useState('') // initial value is empty string

  // 2nd approach (but pass an object as the state data)
  const [mixedInputElement, setMixedInputElement] = useState({
    password: '',
    address: '',
  }) // pass default value as an empty object

  return (
    // this is called fragment, same as <React.Fragment> blablabla... </React.Fragment>
    <>
      <form
        name="simple-form"
        className="flex flex-col gap-2 text-gray-900"
        onSubmit={e => {
          e.preventDefault()

          // the simplest and good to go for grabbing all data on form
          const data = new FormData(e.currentTarget)

          console.log('---')

          // grab all input field that has a name prop
          console.log('Print form data:')
          data.forEach((value, key) => console.log(`{ ${key}: "${value}" }`))

          console.log('---')

          // or grab an individual input field with his name
          console.log('username:', e.currentTarget.username.value)
          console.log('address:', e.currentTarget.address.value)

          console.log('---')

          // or grab it from ref
          console.log(
            'first name:',
            firstnameRef.current && firstnameRef.current.value, // check not null first
          )

          console.log('---')

          // or grab it from state
          console.log('email:', emailState)
          console.log('password:', mixedInputElement.password)
        }}
      >
        {/* using ref */}
        <input
          placeholder="First Name"
          type="text"
          name="firstname"
          ref={firstnameRef} // using ref
          className={inputClassName}
        />
        <input
          placeholder="Last Name"
          type="text"
          name="lastname"
          ref={lastnameRef} // using ref
          className={inputClassName}
        />

        {/* using state */}
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={usernameState}
          onChange={e => setUsernameInput(e.target.value)} // using state
          className={inputClassName}
        />
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={emailState}
          onChange={e => setEmailInput(e.target.value)} // using state
          className={inputClassName}
        />

        {/* using state as an object value */}
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={mixedInputElement.password}
          className={inputClassName}
          // using state (value as an object)
          // spread the existing value, then replace password with e.target.value
          // so the other keys is reserved and not replaced
          onChange={e =>
            setMixedInputElement({
              ...mixedInputElement,
              password: e.target.value,
            })
          }
        />
        <input
          placeholder="Address"
          type="text"
          name="address"
          value={mixedInputElement.address}
          className={inputClassName}
          // using state (value as an object)
          // spread the existing value, then replace addres with e.target.value
          // so the other keys is reserved and not replaced
          onChange={e =>
            setMixedInputElement({
              ...mixedInputElement,
              address: e.target.value,
            })
          }
        />

        {/* we cannot get any data from this element. ref, state, or even name prop is not provided */}
        <textarea
          placeholder="Unrecognized input because we not provide a name property on the html"
          className={inputClassName + ' focus:ring-rose-500'}
        ></textarea>

        <div className="mt-2"></div>

        <button
          type="submit"
          className="w-full px-5 py-2 mx-auto text-white rounded lg:px-20 bg-emerald-700 hover:bg-emerald-600"
        >
          Submit
        </button>
      </form>

      <p>Your first name is: {(firstnameRef.current && firstnameRef.current.value) || '-'}</p>
      <p>Your username is: {usernameState || '-'}</p>
      <p>Your password is: {mixedInputElement.password || '-'}</p>
    </>
  )
}

export default SimpleForm
