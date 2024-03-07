import { server } from "@composabase/sdk"
import schema from "./graphql/schema"

schema.moduleList.map(a => console.log(a))

server({
  schema
})
