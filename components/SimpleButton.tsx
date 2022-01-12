import { FC } from "react";

interface Props {}

/**
 * A simple button as an example that trigger onClick event and logging the button name.
 *
 * Use this button as an example for a react component with .tsx (typescript extension) format.
 *
 * But, wtf is jsx (or tsx)?
 *
 * @ref https://jasonformat.com/wtf-is-jsx/
 * @ref https://facebook.github.io/jsx/
 */
const SimpleButton: FC<Props> = ({}) => {
  return (
    <button
      name="example-btn"
      onClick={(e) => console.log("Element name:", e.currentTarget.name)}
    >
      Click me!
    </button>
  );
};

export default SimpleButton;
