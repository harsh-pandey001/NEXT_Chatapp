"use client"
import { useState } from "react"
import { useSocket } from "../context/SocketProvider"
import classes from "./page.module.css"


export default function Page() {
  const {sendMessage} = useSocket()
  const [message, setMessage] = useState('')

  return (
    <div>
      <div>
        <h1>
          All Messages will appear here</h1>
      </div>
      <div>
        <input className={classes["chat-input"]} type="text" placeholder="message..."
        onChange={(e) => setMessage(e.target.value)}
        />
        <button className={classes["button"]}
        onClick={e => sendMessage(message)}
        >Send</button>
      </div>
    </div>
  )
}