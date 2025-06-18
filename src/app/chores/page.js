import React from 'react'
import Chores from "../components/Chores"
import axios from "axios"
import Link from "next/link";

const page = async () => {
  let data = await axios.get("http://localhost:3001/api/chores")
  data.data.forEach(element => {
    element.pageId = 1
    element.type = "chores"
  });

  
  return (
    <div>
  <header className="bg-rose-500 text-white p-6 shadow-md">
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-3xl font-extrabold">All Your Chores</Link>
    </div>
  </header>

  <Chores items={data.data} />
</div>
  )
}

export default page