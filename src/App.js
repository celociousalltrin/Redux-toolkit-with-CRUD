import { BrowserRouter } from "react-router-dom";
import Navigation from "./Component/Navigation";
import {UseUserContext} from "./Component/Utilities/Context";
import "./App.css";

function App() {
  const {theme} = UseUserContext()
  return (
    <div id={theme}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
