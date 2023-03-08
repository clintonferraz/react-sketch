import './style.css'

type InputProps = {
  handleAdd: (text: string) => void;
}

export default function Input(props: InputProps) {

  function handleClick(){
    console.log('teste');
  }

  return (
    <div className="toDoInput">
        <input type="text" name="new-todo" className="new-todo-input" placeholder='What needs to be done?' />
        <div className="btn-add" onClick={() => props.handleAdd('teste')}>Add</div>
    </div>
  )
}
