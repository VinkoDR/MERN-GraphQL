const { projects, clients } = require("../sampleData.js")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = require("graphql")

// Client Type
const ClientType = new GraphQLObjectType({
    name : "Client",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })

    
})

const RootQuery = new GraphQLObjectType({
    name : "RootQuerytype",
    fields: {
        client: {
            type: ClientType,
            args: {id :{type: GraphQLID}},
            resolve(parents,args){
                //later we will use mongoose to get a single client...
                return clients.find(client => client.id === args.id)
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery
})