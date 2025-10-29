import { useState } from 'preact/hooks'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Preact Sample</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p>
        Edit <code>src/app.jsx</code> and save to test HMR
      </p>
    </div>
  )
}
