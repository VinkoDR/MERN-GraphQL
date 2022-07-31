const { projects, clients } = require("../sampleData.js")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require("graphql")


// Mongoose models:
const Project = require("../models/Project")
const Client = require("../models/Client")

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
               return Project.find()
            }
        },
        //query get single project
        project: {
            type: ProjectType,
            args: {id :{type: GraphQLID}},
            resolve(parents,args){
                //later we will use mongoose to get a single client...
               // return projects.find(project => project.id === args.id)
               return Project.findById(args.id)

            }
        },
        //query get all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parents,args){
               return Client.find()
            }
        },
        //query get single client
        client: {
            type: ClientType,
            args: {id :{type: GraphQLID}},
            resolve(parents,args){
                //later we will use mongoose to get a single client...
                //return clients.find(client => client.id === args.id)
                return Client.findById(args.id)
            }
        }
    }

})

//mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                email: { type: GraphQLNonNull(GraphQLString)},
                phone: { type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parents, args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return client.save()
            }
        }
    }
})

//mutation example query on graphiql
// mutation {
//     addClient(name: "Vinko Roditi", email: "vinko.roditi@yahoo.fr", phone: "955-365-3376") {
//       id
//       name
//       email
//       phone
//     }
//   }

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})