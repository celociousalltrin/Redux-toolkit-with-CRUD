import { BrowserRouter } from "react-router-dom";
import Navigation from "./Component/Navigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </>
  );
}

export default App;
