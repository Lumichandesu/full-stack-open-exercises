import { useEffect, useRef, useState } from 'react'
import service from './services/persons'
import { Filter, PersonForm, Persons, Notification } from './components/Phonebook'

export default function App() {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [busy, setBusy] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const confirm = text => new Promise(resolve => setConfirmation({ text, resolve }))
  const answerConfirmation = accepted => { confirmation.resolve(accepted); setConfirmation(null) }
  const timer = useRef(null)
  const notify = (text, error = false) => {
    clearTimeout(timer.current)
    setNotification({ text, error })
    timer.current = setTimeout(() => setNotification(null), 5000)
  }
  useEffect(() => {
    let active = true
    service.getAll().then(data => { if (active) setPersons(data) }).catch(() => { if (active) setNotification({ text: 'Cannot load phonebook. Start the local server.', error: true }) })
    return () => { active = false; clearTimeout(timer.current) }
  }, [])
  const handleSubmit = async event => {
    event.preventDefault()
    if (busy) return
    const cleanName = name.trim()
    const cleanNumber = number.trim()
    if (!cleanName || !cleanNumber) { notify('Name and number are required.', true); return }
    const existing = persons.find(person => person.name.toLowerCase() === cleanName.toLowerCase())
    if (existing && !await confirm(`${existing.name} is already added to phonebook. Replace the old number?`)) return
    setBusy(true)
    try {
      const saved = existing ? await service.update(existing.id, { ...existing, number: cleanNumber }) : await service.create({ name: cleanName, number: cleanNumber })
      setPersons(previous => existing ? previous.map(person => person.id === saved.id ? saved : person) : [...previous, saved])
      notify(`${existing ? 'Updated' : 'Added'} ${saved.name}`)
      setName(''); setNumber('')
    } catch (error) {
      if (existing && error.response?.status === 404) {
        setPersons(previous => previous.filter(person => person.id !== existing.id))
        notify(`${existing.name} was already removed from the server.`, true)
      } else notify('Could not save the entry. Please try again.', true)
    } finally { setBusy(false) }
  }
  const handleDelete = async person => {
    if (!await confirm(`Delete ${person.name}?`)) return
    try { await service.remove(person.id); setPersons(previous => previous.filter(item => item.id !== person.id)); notify(`Deleted ${person.name}`) }
    catch (error) {
      if (error.response?.status === 404) setPersons(previous => previous.filter(item => item.id !== person.id))
      notify(error.response?.status === 404 ? `${person.name} was already removed from the server.` : 'Could not delete the entry.', true)
    }
  }
  return <main>
    <h1>Phonebook</h1><Notification notification={notification} />
    {confirmation && <section role="dialog" aria-modal="true" aria-label="Confirm change">
      <p>{confirmation.text}</p>
      <button type="button" onClick={() => answerConfirmation(true)}>Confirm</button>
      <button type="button" onClick={() => answerConfirmation(false)}>Cancel</button>
    </section>}
    <Filter value={filter} onChange={event => setFilter(event.target.value)} />
    <h2>Add a new</h2>
    <PersonForm name={name} number={number} onName={event => setName(event.target.value)} onNumber={event => setNumber(event.target.value)} onSubmit={handleSubmit} />
    {busy && <p role="status">Saving…</p>}
    <h2>Numbers</h2><Persons persons={persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))} onDelete={handleDelete} />
  </main>
}
