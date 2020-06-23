import React from "react";
import Base from "./core/Base";
import { API } from "./backend";

const App = () => {
  return (
    <div>
      <h1>hello i am here</h1>
      <Base>
        <h5>{API}</h5>
      </Base>
    </div>
  );
};
export default App;
