const Header = ({ name }) => <h2>{name}</h2>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const Content = ({ parts }) => <>{parts.map(part => <Part key={part.id} part={part} />)}</>
const Total = ({ parts }) => <strong>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
export default function Course({ course }) {
  return <section><Header name={course.name} /><Content parts={course.parts} /><Total parts={course.parts} /></section>
}
