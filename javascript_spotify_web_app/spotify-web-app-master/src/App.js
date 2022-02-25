import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from './Components/Container';
import { Routes, Route } from 'react-router-dom'
import Songs from "./Components/Songs";

axios.defaults.baseURL = 'https://nest-spotify-api.herokuapp.com/api/v1';

function App() {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    Promise.resolve(
      axios.get('/songs/clusters')
    ).then((res) => {
      setClusters(res.data);
    });
  }, []);

  return (  
    <div className="App">
      <Routes>
        <Route path="/songs" element={<Songs/>}></Route>
        <Route path="/" element={<Container clusters={clusters}/> }></Route>
      </Routes> 
    </div>
  );
}

export default App;
