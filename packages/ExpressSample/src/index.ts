import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Express Sample!',
    endpoints: {
      health: '/health',
      hello: '/hello/:name'
    }
  })
})

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/hello/:name', (req: Request, res: Response) => {
  const { name } = req.params
  res.json({ message: `Hello, ${name}!` })
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
  console.log(`Visit http://localhost:${port}`)
})
