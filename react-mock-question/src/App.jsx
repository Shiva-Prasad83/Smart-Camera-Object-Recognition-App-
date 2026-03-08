import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './components/List'
function App() {

  const [items,setItems]=useState([
    {id:1,name:"item1",description:"This is item1"},
    {id:2,name:"item2",description:"This is item2"},
    {id:3,name:"item3",description:"This is item3"},
    {id:4,name:"item4",description:"This is item4"},
    {id:5,name:"item5",description:"This is item5"},
  ])
/*
Create a React component that displays a list of items with a toggle button to show or
hide the details of each item. The component should receive an array of items as props,
where each item has a 'name' and 'description' property. When the toggle button is
clicked, the component should display or hide the description of the corresponding item.
The component should be implemented in a single file and should not use any external
APls.
Implement this feature using React hooks and conditional rendering.
Please provide your approach to solve this problem.
*/
  return (
    <div>
    <List items={items} setItems={setItems}/>
    </div>
  )
}

export default App
