import { Cromo } from 'cromo'

const cromo = new Cromo()

cromo.listen(port => {
  console.log(`Listening on port ${port}`)
})
