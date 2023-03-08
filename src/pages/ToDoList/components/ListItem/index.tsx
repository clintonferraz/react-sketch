import './style.css'

type ListItemProps = {
  text: string;
}

export default function ListItem(props: ListItemProps) {

  function handleClick(){
    console.log('teste');
  }

  return (
    <div className="listItemWrapper">
        <div className="listItem">
          { props.text }
          <div className="deleteBtn" onClick={handleClick}>X</div>
        </div>
    </div>
  )
}