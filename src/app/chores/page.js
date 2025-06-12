import React from 'react'
import Chores from "../components/Chores"
import axios from "axios"

const page = async () => {
  let data = await axios.get("http://localhost:3001/api/chores")
  data.data.forEach(element => {
    element.pageId = 1
    element.type = "chores"
  });

  
  return (
    <Chores 
      items={data.data}
    
    />
  )
}

export default page