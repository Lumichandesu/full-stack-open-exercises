import { useEffect, useState } from 'react'
import Country from './components/Country'
import service from './services/countries'

export default function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    service.getAll(controller.signal).then(data => { setCountries(data); setLoading(false) }).catch(() => { if (!controller.signal.aborted) { setError('Unable to load countries. Please refresh to retry.'); setLoading(false) } })
    return () => controller.abort()
  }, [])
  const matches = countries.filter(country => country.name.common.toLowerCase().includes(query.trim().toLowerCase()))
  const shown = selected || (matches.length === 1 ? matches[0] : null)
  return <main>
    <h1>Countries</h1>
    <label>find countries <input value={query} onChange={event => { setQuery(event.target.value); setSelected(null) }} /></label>
    {loading ? <p role="status">Loading countries…</p> : error ? <p role="alert">{error}</p> : shown ? <Country key={shown.cca3} country={shown} /> : matches.length > 10 ? <p>Too many matches, specify another filter</p> : matches.length === 0 ? <p>No matches</p> : <ul>{matches.map(country => <li key={country.cca3}>
      {country.name.common} <button type="button" onClick={() => setSelected(country)}>show {country.name.common}</button>
    </li>)}</ul>}
  </main>
}
