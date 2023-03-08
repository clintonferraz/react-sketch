import { useState } from 'react'
import Input from './components/Input'
import ListItem from './components/ListItem'
import './style.css'

export default function ToDoList() {
  const [list, setList] = useState<string[]>([])

  function handleAddItem(text: string){
    setList([...list, text])
  }


  return (
    <div className='toDoList'>
      <div className="container">      
        <Input handleAdd={handleAddItem} />
        <ListItem text='teste' />
        {
          list.map((listItem,index) => 
           <ListItem text={listItem} key={index}/>
          )
        }
        
      </div>
    </div>
  )
}
