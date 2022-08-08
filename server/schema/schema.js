const { projects, clients } = require("../sampleData.js")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require("graphql")

// problems avec les enums et status
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
               // return Client.find(client => client.id === parent.clientId)
               return Client.findById(parent.clientId);
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
        },
        //delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parents, args){
                //Je cherche les projets qui ont un clientId egale a l'id du client
                // que je veux supprimer
                Project.find({clientId : args.id}).then(
                    (projects) => {
                        //je supprime chaque projets trouvé
                        projects.forEach( project => {
                            project.remove()
                        })
                    }
                )
                return Client.findByIdAndRemove(args.id)
            }
        },
        //add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                description: { type: GraphQLNonNull(GraphQLString)},
                status: { 
                    type: new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values: {
                        new: {value : 'Not Started'},
                        progress: {value : 'In Progress'},
                        completed: {value : 'Completed'},
                    }
                }),
                //  defaultValue: 'Not Started',

               
            },
                clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parents, args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })
                return project.save()
            }
        },
       // delete project
       deleteProject: {
            type: ProjectType,
            args: {
                    id: { type: GraphQLNonNull(GraphQLID)},
                },
                resolve(parents, args){
                    return Project.findByIdAndRemove(args.id)
            }
            
       },
       //update a project
       updateProject: {
            type: ProjectType,
            args: {
                    id: { type: GraphQLNonNull(GraphQLID)},
                    name: { type: GraphQLString},
                    description: { type: GraphQLString},
                    status:
                    { 
                        type: new GraphQLEnumType
                        ({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: {value : 'Not Started'},
                            progress: {value : 'In Progress'},
                            completed: {value : 'Completed'},
                                },
                        }),
                      
                    }, 
                 },
            resolve(parents, args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                      $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                      },
                    },
                    { new: true }
                  );
                
            }
            
       }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
}) 