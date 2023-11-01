import React, { useEffect, useState } from 'react';
import './style.css';

const w_data_string = `test data
`;
const w_data = JSON.parse(w_data_string);

function Location(pos) {
  return (
    <>
      <div className='text_tp_1'>
        {pos ? 
          <img src={"https://openweathermap.org/img/wn/" + pos.weather[0].icon + "@2x.png"} alt="Loading..." className='weather-icon'></img> :
          <img src={require("./assets/loading.gif")} alt="Loading..." className='weather-icon'></img> }
        <span>{(pos.name || "Getting Location...")}</span>
      </div>
    </>
  )
}

const Weather = () => {
  const [position, setPos] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      const position_ = await new Promise((r, s) => {
        navigator.geolocation.getCurrentPosition(r, s);
      });
      setPos(position_);
    }
    getLocation();
    setData(w_data);
  }, []);
  /*
  useEffect(() => {
    async function getData(){
      return await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid="+process.env.REACT_APP_OW_API_KEY)
      .then((res) => {return res.json()})
    }
    try {
      position && getData().then((res) => setData(res));
    }
    catch(e) {
      console.error(e);
    }
    }, [position]);
  */
 console.log(data);
  return (
    <div>
      <div className='header' style={{marginTop: "5vh"}}>
        {Location(data)}
        <div className='temperature'>
          {data ? (parseInt(data.main.temp)-275 + "°") : "..."}
        </div>
        <div className='text_tp_1' style={{marginTop: "3vh"}}>
          {data ? data.weather[0].description : "Getting data..."}
        </div>
      </div>
    </div>
  )
};

function App() {
  return (
    <div>
      <Weather />
    </div>
  );
}

export default App;
