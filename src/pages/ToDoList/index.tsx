import { useState } from 'react'
import Input from './components/Input'
import ListItem from './components/ListItem'
import './style.css'

export default function ToDoList() {
  const [list, setList] = useState<string[]>([])

  function handleAddItem(text: string){
    text != '' ? setList([...list, text]) : null
  }
  
  function deleteItem(index: number){
    setList(oldList => {
      let newList = [...oldList];
      newList.splice(index,1);
      return newList;
    })
  }


  return (
    <div className='toDoList'>
      <div className="container">      
        <Input handleAdd={handleAddItem} />
        {
          list.map((listItem,index) => 
           <ListItem text={listItem} key={index} index={index} deleteFunction={deleteItem}/>
          )
        }
        
      </div>
    </div>
  )
}
