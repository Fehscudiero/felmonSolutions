import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// Rota de teste
app.get('/api/ping', (_, res) => {
    res.json({ message: 'pong' })
})

const PORT = 4000
app.listen(PORT, () => {
    console.log(`🚀 Backend rodando em http://localhost:${PORT}`)
})
