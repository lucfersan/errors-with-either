import { config } from 'dotenv-flow'

import { app } from './config/app'
import { env } from './config/env'

config({ silent: true })

app.listen(env.port, () =>
  console.log(`Server listening on port ${env.port} 🔥`)
)
// aefeafa
