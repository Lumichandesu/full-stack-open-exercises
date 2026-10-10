import { useEffect, useState } from 'react'
import service from '../services/countries'

const weatherLabel = code => code === 0 ? 'Clear sky ☀️' : code <= 3 ? 'Cloudy ⛅' : [45, 48].includes(code) ? 'Fog 🌫️' : code >= 95 ? 'Thunderstorm ⛈️' : [71, 73, 75, 77, 85, 86].includes(code) ? 'Snow or snow showers ❄️' : 'Precipitation 🌧️'
export default function Country({ country }) {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    service.getWeather(country, controller.signal).then(setWeather).catch(error => { if (!controller.signal.aborted) setError(error.message || 'Weather unavailable') })
    return () => controller.abort()
  }, [country])
  return <section>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital?.join(', ') || 'Not available'}</p>
    <p>area {country.area} km²</p>
    <h3>languages</h3><ul>{Object.entries(country.languages || {}).map(([code, language]) => <li key={code}>{language}</li>)}</ul>
    <img src={country.flags.svg || country.flags.png} alt={country.flags.alt || `Flag of ${country.name.common}`} width="200" />
    <h3>Weather in {country.capital?.[0] || 'capital'}</h3>
    {error ? <p role="alert">Weather unavailable. {error}</p> : weather ? <>
      <p>temperature {weather.current.temperature_2m} {weather.current_units.temperature_2m}</p>
      <p>{weatherLabel(weather.current.weather_code)}</p>
      <p>wind {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</p>
      <p>Weather time: {weather.current.time} ({weather.timezone})</p>
      <small>Weather data by <a href="https://open-meteo.com/">Open-Meteo</a></small>
    </> : <p role="status">Loading weather…</p>}
  </section>
}
