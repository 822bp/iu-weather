import React, { useState } from 'react';
import './style.css';

function Location() {
  const [pos, setPos] = useState("");
  const geolocator = navigator.geolocation.getCurrentPosition(setPos);
  return (
    <div className='location'>{(pos && (pos.coords.latitude + ", " + pos.coords.longitude)) || "Getting Location..."}</div>
  )
}

function header() {
  return (
    <div className="header">{Location()}</div>
  )
}

function App() {
  return (
    <div>
      {header()}
    </div>
  );
}

export default App;
