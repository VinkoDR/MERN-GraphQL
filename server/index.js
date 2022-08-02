const express = require("express")
const colors = require("colors")
const cors = require("cors")
require("dotenv").config()
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const connectDb = require("./config/db")

const port = process.env.PORT || 9000

const app = express()
//connect to database
connectDb()

//avoid cors isssues
app.use(cors())

//  `/graphql` est la route
app.use(`/graphql`, graphqlHTTP({
    schema,
    
    graphiql: process.env.NODE_ENV === 'development',
}))

app.listen(port, console.log(`server running on ${port}`))