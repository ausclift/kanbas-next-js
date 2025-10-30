import { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroupItem, ListGroup } from "react-bootstrap";
export default function ArrayStateVariable() {
 const { todos } = useSelector((state: any) => state.todosReducer);
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => i !== index));
 };
 return (
  <div id="wd-array-state-variables">
   <h2>Array State Variable</h2>
   <button className="btn btn-success mb-2" onClick={addElement}>Add Element</button>
   <br/>
   <ul>
    {array.map((item, index) => (
     <li className="list-group-item d-flex justify-content-between" key={index}> {item}
      <button  className="btn btn-danger mb-2" onClick={() => deleteElement(index)}>
       Delete</button>
     </li>))}
   </ul>
   <ListGroup>
      {todos.map((todo: any) => (
        <ListGroupItem key={todo.id}>
          {todo.title}
        </ListGroupItem>
      ))}
    </ListGroup>
<hr/>
</div>);}
