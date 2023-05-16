import app from './app'
import { PORT } from './config';

app.listen(PORT, () => {
  console.log(`Server up and listening on port: ${PORT}`)
})
