import { useState } from "react";

function List({items,setItems}){


    const [showDes,setShowDes]=useState([
        {id:1,isShow:false},
        {id:2,isShow:false},
        {id:3,isShow:false},
        {id:4,isShow:false},
        {id:5,isShow:false}
    ]);
    function toggleDescription(id){
     setShowDes((prev)=>{
        return prev.map((des)=>{
            if(des.id===id){
                return {...des,isShow:!des.isShow}
            }
            return des;
        })
     })
    }
    return (
        <div>
        <ol>
          {
            items.map((item,index)=>{
              return <div key={item.id}>
                <li>{item.name}</li>
                <button onClick={()=>toggleDescription(item.id)}>{showDes[index].isShow?"Hide Des":"Show Des"}</button>
                {showDes[index].isShow&& <p>{item.description}</p>}
                </div> 
            })
          }
          </ol>
        </div>
    )
}

export default List;