import express, { Express } from "express"
import TopicRoutes from "./topic.route"
import TagRoutes from "./tag.route"

const app: Express = express()

app.use("/topics", TopicRoutes)
app.use("/tags", TagRoutes)

export default app
