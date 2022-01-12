import type { NextPage } from "next";
import React from "react";
import SimpleButton from "../components/SimpleButton";

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>;
      {/* call this button component */}
      <SimpleButton />
    </React.Fragment>
  );
};

export default Home;
