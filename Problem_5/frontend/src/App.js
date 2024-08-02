import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import SearchComponent from "./components/SearchComponent";
import ResultsTable from "./components/ResultsTable";
import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavigationAndRoutes />
      </AuthProvider>
    </Router>
  );
}

function NavigationAndRoutes() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { authToken } = useAuth();

  const fetchData = async () => {
    const response = await fetch(
      `https://np0gqaxmz1.execute-api.us-west-2.amazonaws.com/dev/person/search/${searchQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = await response.json();
    setSearchResults(data.data);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleLogin = (userData) => {
    console.log("User logged in:", userData);
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <div>
              <h1>Person Search and Edit</h1>
              <SearchComponent
                onSearchResults={setSearchResults}
                onSearchQueryChange={handleSearchQueryChange}
              />
              <ResultsTable data={searchResults} fetchData={fetchData} />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
