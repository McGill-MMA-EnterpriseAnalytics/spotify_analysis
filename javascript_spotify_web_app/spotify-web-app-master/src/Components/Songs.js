import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './Stylesheets/Songs.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Songs() {
  const location = useLocation();
  const cluster = location.state.name;
  const value = location.state.value;
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    Promise.resolve(
      axios.get(`/songs/${cluster}/${value}`)
    ).then((res) => {
      setLoading(false)
      res && setSongs(res.data)
    });

  }, [cluster, value, refresh]);

  const songList = songs.map((song) => 
    {
    return ( 
    <div key={`div-${song.name}`} className="song">
    <Card key={`card-${song.name}`} sx={{ backgroundColor: "#1DB954", minWidth: 275, maxWidth: 700 }}>
    <CardContent key={`card_content-${song.name}`}>
      <Typography key={song.name} color="text.primary" gutterBottom><b>Name:</b></Typography> <Typography className="songname" color="text.secondary">{song.name}</Typography>
      <Typography key={song.artists} color="text.primary" gutterBottom><b>Artists:</b></Typography> <Typography color="text.secondary">{song.artists.slice(2, song.artists.length-2).split("'").join(' ')}</Typography>
      <Typography key={song.year} color="text.primary" gutterBottom><b>Year:</b></Typography> <Typography color="text.secondary">{song.year}</Typography>
    </CardContent>
    </Card>
    </div>
    )
    }
  )

  const loadingInterface = 
  <div className="loading">
    <CircularProgress sx={{marginTop:"20em"}} size={120} color="success" />
  </div>;

  const normalInterface = 
  <div>
  <div className="buttons">
  <IconButton 
    className="refresh" 
    sx={{  backgroundColor: "#1DB954"}} 
    aria-label="refresh" size="large"
    onClick={()=>refresh ? setRefresh(false) : setRefresh(true) & setLoading(true)}  
    >
    <RefreshIcon 
    color="success" 
    fontSize="large" 
    />
  </IconButton>
  <Link to='/'>
  <IconButton 
    className="backspace" 
    sx={{ backgroundColor: "#1DB954"}} 
    aria-label="delete" 
    size="large"
  >
    <KeyboardBackspaceIcon 
      color="success" 
      fontSize="large"    
    />
  </IconButton>
  </Link>
  </div>
  
  <ul className="songlist">{songList}</ul>
  </div>;

  return (
    loading ? loadingInterface : normalInterface
  )
}