import { useEffect } from "react"
import { useState } from "react"
const App = () => {
  const [count , setCount]= useState(0)
  const [input ,setInput] = useState()

  const handleIncrement =()=>{
    setCount(count + 1)

  }

  const handleDecrement =()=>{
    setCount(count - 1)

  }
  const handleInput=()=>{
    setInput(input)
  }

  useEffect(()=>{ 

    console.log("hello")
    


  },[input ])
   



  return (
    <div className="text-white flex justify-center items-center h-screen text-lg font-bold gap-4 ">
      <button 
      className="bg-green-700 p-4 rounded-xl"
      onClick={handleIncrement}>+</button>
      <small className="text-black">{count}</small>
      <button 
      className="bg-red-700 p-4 rounded-xl"
      onClick={handleDecrement}>-</button>

      <input type="text" 
      className="bg-gray-500"
      onChange={handleInput}
       />

    </div>
  )
}

export default App
