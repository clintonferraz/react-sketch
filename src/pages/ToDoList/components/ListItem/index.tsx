import './style.css'
import { BsTrashFill } from 'react-icons/bs'
import { useState } from 'react'

type ListItemProps = {
  text: string;
  deleteFunction: (key: number) => void;
  index: number;
}

export default function ListItem(props: ListItemProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleClick(){
    props.deleteFunction(props.index);
  }

  function handleCheck(checked: boolean){
    setIsChecked(checked);

  }

  return (
    <div className="listItemWrapper">
        <div className="listItem">
          <div>
            <input type="checkbox" name="" id="item-checkbox" onChange={(e) => handleCheck(e.target.checked)} checked={isChecked}/>
            <span style={isChecked ? {  textDecoration: 'line-through'} : undefined} >{ props.text }</span>
          </div>
          
          <div className="deleteBtn" onClick={handleClick}><BsTrashFill /></div>
        </div>
    </div>
  )
}