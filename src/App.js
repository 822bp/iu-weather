import React, { useEffect, useState } from 'react';
import './style.css';

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

function SunStatus({data: weather}) {
  const sunPercent = () => weather && weather.dt < weather.sys.sunset ? parseInt((weather.dt - weather.sys.sunrise) / (weather.sys.sunset - weather.sys.sunrise) * 100) :
  parseInt((weather.sys.sunrise + 86400 - weather.dt) / (weather.sys.sunset + 86400 - weather.sys.sunrise) * -100);
  const getSunsetColor = () => (sunPercent() > 0) ? ("yellow") : ("darkblue");
  return (
    <div className='section' style={{backgroundColor: weather && getSunsetColor()}}>
      <div className='sunset-text'>{weather && sunPercent() > 0 ? (sunPercent() + "% until dawn") : (sunPercent()*-1 + "% until sunrise")}</div>
    </div>
  )
}

function Wind({data: weather}) {
  const c_style = {
    transform: weather ? "rotate("+ weather.wind.deg + "deg)": 'rotate(0deg)', 
    transition: 'transform 250ms ease',
  }
  return (
    <div className='box-section'>
      <div className='text_tp_1' style={{marginTop: "2vh"}}>Wind: {!weather ? (<img src={require("./assets/loading.gif")} alt="Loading..." className='weather-icon'></img>) :
      (weather.wind.speed + " knots @" + weather.wind.deg + "°")
      }</div>
      <img src={require("./assets/compass.png")} alt="Loading..." className='compass' style={c_style}></img>
    </div>
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
  }, []);

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

 console.log(data);
  return (
    <div>
      <div className='header' style={{marginTop: "5vh"}}>
        {Location(data)}
        <div className='temperature'>
          {data ? (parseInt(data.main.temp)-273 + "°") : "..."}
        </div>
        <div className='text_tp_1' style={{marginTop: "3vh"}}>
          {data ? data.weather[0].description : "Getting data..."}
        </div>
      </div>
      <SunStatus data={data}/>
      <Wind data={data}/>
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
