const Header = ({ name }) => <h1>{name}</h1>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const Content = ({ parts }) => <section>{parts.map(part => <Part key={part.name} part={part} />)}</section>
const Total = ({ parts }) => <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
export default function App() {
  const course = { name: 'Half Stack application development', parts: [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ] }
  return <main><Header name={course.name} /><Content parts={course.parts} /><Total parts={course.parts} /></main>
}
