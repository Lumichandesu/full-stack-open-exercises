export const Filter = ({ value, onChange }) => <label>filter shown with <input value={value} onChange={onChange} /></label>
export const PersonForm = ({ name, number, onName, onNumber, onSubmit }) => <form onSubmit={onSubmit}>
  <p><label>name <input required value={name} onChange={onName} /></label></p>
  <p><label>number <input required value={number} onChange={onNumber} /></label></p>
  <button type="submit">add</button>
</form>
export const Persons = ({ persons, onDelete }) => <ul>{persons.map(person => <li key={person.id}>
  {person.name} {person.number} <button type="button" onClick={() => onDelete(person)}>delete {person.name}</button>
</li>)}</ul>
export const Notification = ({ notification }) => notification ? <p role={notification.error ? 'alert' : 'status'} className={notification.error ? 'error' : 'success'}>{notification.text}</p> : null
