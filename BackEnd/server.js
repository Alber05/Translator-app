import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
const port = 4000

dotenv.config()

app.use(express.json())

const whiteList = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Error de cors'))
    }
  }
}

app.use(cors(corsOptions))

app.post('/translate', async (req, res) => {
  const { text, target_lang, source_lang } = req.body

  try {
    const response = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      {
        text: [text],
        target_lang,
        source_lang
      },
      {
        headers: {
          Authorization: `DeepL-Auth-Key ${process.env.API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    res.json(response.data)
  } catch (error) {
    // console.error('Error:', error)
    res.status(500).send('Error al traducir el texto')
  }
})

app.get('/languages', async (req, res) => {
  console.log('hola')
  try {
    const response = await axios.get(
      'https://api-free.deepl.com/v2/languages?type=target',

      {
        headers: {
          Authorization: `DeepL-Auth-Key ${process.env.API_KEY}`,
          'User-Agent': 'traductor/1.2.3'
        }
      }
    )
    res.json(response.data)
  } catch (error) {
    // console.error('Error:', error)
    res.status(500).send('Error al traducir el texto')
  }
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
