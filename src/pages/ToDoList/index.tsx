import { useState } from 'react'
import Input from './components/Input'
import ListItem from './components/ListItem'
import './style.css'

export default function ToDoList() {
  const [list, setList] = useState<{text: string, uniqueId: number}[]>([])

  function handleAddItem(text: string){
    text != '' ? setList([...list, {text , uniqueId: new Date().getTime()}]) : null
  }
  
  function deleteItem(index: number){
    setList(oldList => {
      let newList = [...oldList];
      newList.splice(index,1);
      return newList;
    })
    console.log(list)
  }


  return (
    <div className='toDoList'>
      <div className="container">      
        <Input handleAdd={handleAddItem} />
        {
          list.map((listItemText,index) => {
            return <ListItem text={listItemText.text} key={listItemText.uniqueId} index={index} deleteFunction={deleteItem}/>
          })
        }
        
      </div>
    </div>
  )
}
