"use client"
import { useState } from "react"
import { useSocket } from "../context/SocketProvider"
import classes from "./page.module.css"


export default function Page() {
  const {sendMessage, messages} = useSocket()
  const [message, setMessage] = useState('')

  return (
    <div>

      <div>
        <input className={classes["chat-input"]} type="text" placeholder="message..."
        onChange={(e) => setMessage(e.target.value)}
        />
        <button className={classes["button"]}
        onClick={e => sendMessage(message)}
        >Send</button>
      </div>
      <div>
        {messages.map((element,key)=>{
         return <li key={key}>{element.message}</li>
        })}
      </div>
    </div>
  )
}