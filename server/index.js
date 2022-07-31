const express = require("express")
require("dotenv").config()
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")

const port = process.env.PORT || 9000

const app = express()

//  `/graphql` est la route
app.use(`/graphql`, graphqlHTTP({
    schema,
    
    graphiql: process.env.NODE_ENV === 'development',
}))

app.listen(port, console.log(`server running on ${port}`))