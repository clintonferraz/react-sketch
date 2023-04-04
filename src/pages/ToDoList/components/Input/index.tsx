import './style.css'
import { useState } from 'react'

type InputProps = {
  handleAdd: (text: string) => void;
}

export default function Input(props: InputProps) {

  const [newItem, setNewItem] = useState('');

  function handleAddNewItem(){
    props.handleAdd(newItem);
    setNewItem('');
  }

  return (
    <div className="toDoInput">
        <input 
          type="text" 
          name="new-todo" 
          value={newItem}
          className="new-todo-input" 
          placeholder='What needs to be done?' 
          onChange={(event) => setNewItem(event.target.value)}
          onKeyDown={(event) => event.key ==='Enter' ? handleAddNewItem() : null}
        />

        <div className="btn-add" onClick={() => handleAddNewItem()}>Add</div>
    </div>
  )
}
