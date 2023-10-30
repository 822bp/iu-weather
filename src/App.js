import React, { useEffect, useState } from 'react';
import './style.css';

function Location(pos) {
  return (
    <div className='location'>{(pos && (pos.coords.latitude + ", " + pos.coords.longitude)) || "Getting Location..."}</div>
  )
}

function App() {
  const [position, setPos] = useState("");
  const geolocator = navigator.geolocation.getCurrentPosition(setPos);

  const [data, setData] = useState("");

  useEffect(() => {
    /*position && fetch("https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid="+process.env.OW_API_KEY)
    .then((res) => setData(res))*/
    position && console.log(position.coords.longitude)
    return;
  }, [position]);

  console.log(data);

  return (
    <div>
      <div className='header'>
        {Location(position)}
      </div>
    </div>
  );
}

export default App;
