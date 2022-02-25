import ClusterList from "./ClusterList";
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
export default function Container(props) {

  const { clusters } = props;
  const [ value, setValue ] = useState(8);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (clusters.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [clusters])
  const handleChange = (event, value) => setValue( value );

  const loadingInterface = 
  <div className="loading">
    <CircularProgress sx={{marginTop:"20em"}} size={120} color="success" />
  </div>


  const normalInterface =  
  <div>
    <h1 style={{color: '#1DB954'}}><AllInclusiveIcon fontSize="medium"/>8Potify</h1>
    <Slider
    sx={{color:'#1DB954', maxWidth: '500px'}}
    aria-label="Temperature"
    defaultValue={8}
    valueLabelDisplay="auto"
    value={value}
    min={1}
    max={20}
    onChange={handleChange}/>
    <ClusterList clusters={clusters} value={value}></ClusterList>
  </div>
  
  return (
    loading ? loadingInterface : normalInterface
  )
}