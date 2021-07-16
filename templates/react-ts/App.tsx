import React from 'react'
import { useState } from 'react'

export default function App() {
    const [count, setCount] = useState(0)
    const [time, setTime] = useState('')

    setInterval(() => setTime(new Date().toLocaleString()), 1000)

    return (
        <>
            <h1>{time}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>
                Please Click Me 
            </button>
            <h1>{count}</h1>
        </>
    )
}
