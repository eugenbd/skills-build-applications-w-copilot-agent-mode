import './App.css';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App container py-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              Octofit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#octofitNavbar"
              aria-controls="octofitNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="octofitNavbar">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">
                    Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">
                    Leaderboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">
                    Workouts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="card shadow-sm p-4">
          <Routes>
            <Route path="/" element={<Activities />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Activities />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
