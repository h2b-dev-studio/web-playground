'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Next.js Sample</h1>
        <div className={styles.card}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <p>
          Edit <code>src/app/page.tsx</code> and save to see changes
        </p>
      </div>
    </main>
  )
}
