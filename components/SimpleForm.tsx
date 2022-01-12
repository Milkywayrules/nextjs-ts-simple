import { FC, useRef, useState } from "react";

interface Props {}

const inputClassName =
  "px-3 py-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";

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
   */
  // 1st approach
  const firstnameRef = useRef(null); // initial value is null
  const lastnameRef = useRef(null);

  // 2nd approach
  const [usernameState, setUsernameInput] = useState(""); // initial value is empty string
  const [emailState, setEmailInput] = useState(""); // initial value is empty string

  // 2nd approach (but pass an object as the state data)
  const [mixedInputElement, setMixedInputElement] = useState({
    password: "",
    address: "",
  }); // pass default value as an empty object

  return (
    <form
      name="simple-form"
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        console.log("Print form data:");
        data.forEach((value, key) => console.log(`{ ${key}: "${value}" }`));
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
        onChange={(e) => setUsernameInput(e.target.value)} // using state
        className={inputClassName}
      />
      <input
        placeholder="Email"
        type="text"
        name="email"
        value={emailState}
        onChange={(e) => setEmailInput(e.target.value)} // using state
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
        onChange={(e) =>
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
        onChange={(e) =>
          setMixedInputElement({
            ...mixedInputElement,
            address: e.target.value,
          })
        }
      />

      <div className="mt-2"></div>

      <button
        type="submit"
        className="w-full px-5 py-2 mx-auto text-white border rounded lg:px-20 bg-emerald-700"
      >
        Submit
      </button>
    </form>
  );
};

export default SimpleForm;
