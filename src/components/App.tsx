import './App.css';
import Navigation from './Navigation';
import { BrowserRouter } from "react-router-dom";
import Routing from './Routing';

function App() {
  return (
    <BrowserRouter>
      <Navigation>
        <Routing />
      </Navigation>
    </BrowserRouter>
  );
}

export default App;
