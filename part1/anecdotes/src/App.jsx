import { useState } from 'react'

// Original practice sentences, rather than the provided quotation collection.
const anecdotes = [
  'A small reproducible bug is easier to fix than a large unexplained failure.',
  'State should describe the interface, not fight it.',
  'A useful test explains which promise the program must keep.',
  'Make the next change easy to understand before making it clever.',
  'A backup earns trust when restoration has been tested.',
  'Clear component boundaries make changes easier to review.',
  'Measure a slow path before rewriting a fast one.',
  'An explicit assumption is easier to challenge than a hidden one.',
]
const Anecdote = ({ text, votes }) => <><p>{text}</p><p>has {votes} votes</p></>

export default function App() {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(() => Array(anecdotes.length).fill(0))
  const highest = votes.indexOf(Math.max(...votes))
  const vote = () => setVotes(previous => previous.map((count, index) => index === selected ? count + 1 : count))
  const next = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  return <main>
    <h1>Anecdote of the day</h1>
    <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
    <button type="button" onClick={vote}>vote</button>
    <button type="button" onClick={next}>next anecdote</button>
    <h2>Anecdote with most votes</h2>
    <Anecdote text={anecdotes[highest]} votes={votes[highest]} />
  </main>
}
