import ChoresContainer from "@/app/components/choresContainer"
import { Suspense } from "react"
export default function Page(){
  return (
    <Suspense>
      <ChoresContainer/>
    </Suspense>
  )
}