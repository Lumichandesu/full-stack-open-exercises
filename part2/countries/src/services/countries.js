import axios from 'axios'
const getAll = signal => axios.get('https://studies.cs.helsinki.fi/restcountries/api/all', { signal }).then(response => response.data)
const getWeather = async (country, signal) => {
  let coordinates = country.capitalInfo?.latlng
  if (!coordinates?.length) {
    const { data } = await axios.get('https://geocoding-api.open-meteo.com/v1/search', { signal, params: { name: country.capital?.[0], count: 10, language: 'en', format: 'json' } })
    const place = data.results?.find(result => result.country_code === country.cca2) || data.results?.[0]
    if (!place) throw new Error('Capital coordinates unavailable')
    coordinates = [place.latitude, place.longitude]
  }
  return axios.get('https://api.open-meteo.com/v1/forecast', { signal, params: { latitude: coordinates[0], longitude: coordinates[1], current: 'temperature_2m,wind_speed_10m,weather_code', wind_speed_unit: 'ms', timezone: 'auto' } }).then(response => response.data)
}
export default { getAll, getWeather }
