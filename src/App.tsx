import { useState, useEffect } from "react";
import "./index.css";
import SearchEngine from "./components/SearchEngine";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";

function WeatherComponent() {
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState(null);
  const [icon, setIcon] = useState(null);
  const [kph, setKph] = useState(null);
  const [humidity, setHumidity] = useState(null);

  const [cities, setCity] = useState<string>("Rzeszów");

  const [showDatas, setShowDatas] = useState(false);

  useEffect(() => {
    const key = "f61691bad87049c390c104742232309&q";

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${key}=${cities}&aqi=no`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nie udało się pobrać danych z API");
        }
        return response.json();
      })
      .then((data) => {
        const tempInCelsius = data.current.temp_c;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;
        const kph = data.current.wind_kph;
        const humidity = data.current.humidity;
        setTemperature(tempInCelsius);
        setCondition(condition);
        setIcon(icon);
        setKph(kph);
        setHumidity(humidity);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych z API:", error);
      });
  }, [cities, temperature, condition, icon, kph]);

  return (
    <div className="container">
      <SearchEngine
        onClick={(data) => {
          setCity(data.city);
          console.log(cities);
          setShowDatas(true);
        }}
      />

      {showDatas && <img className="icon"></img>}
      {showDatas && (
        <p className="temp">
          {temperature} <sup>o</sup>C{" "}
        </p>
      )}

      {showDatas && (
        <section>
          <div className="leftDiv">
            <WiHumidity size={70} />
            <div>
              <p>{humidity} %</p>
              <p>Wilgotność</p>
            </div>
          </div>
          <div className="leftDiv">
            <FaWind size={50} />
            <div>
              <p>{kph} km/h</p>
              <p>Prędkość wiatru</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default WeatherComponent;
