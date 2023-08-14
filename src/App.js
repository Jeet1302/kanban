import './App.css';
import StatusDisplay from './Components/StatusDisplay';
import PriorityDisplay from './Components/PriorityDisplay';
import UserDisplay from './Components/UserDisplay';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from './Context/DataContext';


function App() {
  return (
    <div className="App">
      <Router>
      <NavBar></NavBar>
      <DataProvider>
        <Routes>
        <Route
            exact
            path="/"
            element={
              <StatusDisplay></StatusDisplay>
            }
          />
          <Route
            exact
            path="/priority"
            element={
              <PriorityDisplay></PriorityDisplay>
            }
          />
          <Route
            exact
            path="/user"
            element={
              <UserDisplay></UserDisplay>
            }
          />
        </Routes>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
