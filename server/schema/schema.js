const { projects, clients } = require("../sampleData.js")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql")

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

// Project Type
const ProjectType = new GraphQLObjectType({
    name : "Project",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        //relation to client
        client: {
            type: ClientType,
            resolve(parent, args){
                //clientId est une clé secondaire dans les datas de projects
                return clients.find(client => client.id === parent.clientId)
            }}
    })

    
})

const RootQuery = new GraphQLObjectType({
    name : "RootQuerytype",
    fields: {
         //query get all projects
         projects: {
            type: new GraphQLList(ProjectType),
            resolve(parents,args){
               return projects
            }
        },
        //query get single project
        project: {
            type: ProjectType,
            args: {id :{type: GraphQLID}},
            resolve(parents,args){
                //later we will use mongoose to get a single client...
                return projects.find(project => project.id === args.id)
            }
        },
        //query get all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parents,args){
               return clients
            }
        },
        //query get single client
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