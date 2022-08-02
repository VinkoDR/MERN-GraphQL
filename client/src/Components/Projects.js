import React from 'react'
import Spinner from './Spinner'
import {  useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../Queries/projectQueries'
import ProjectCard from './ProjectCard'



export default function Projects() {

    // get info from the query GET_PROJECTS
  const { loading, error, data } = useQuery(GET_PROJECTS)
  if(loading) return <Spinner />
  if(error) return <p>Somethin went wrong</p>
console.log(data.projects)
  return (
    // <div>{!loading && !error && (
    //     <table className='table table-hover mt-3'>
    //         <thead>
    //           <tr>
    //             <th>Name</th>
    //             <th>Description</th>
    //             <th>Status</th>
               
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {data.projects.map((project) => (
    //             <ProjectCard key={project.id} project={project} />
    //           ))}
    //         </tbody>
    //       </table>
    //   )
    //   }</div>
    <>
    {data.projects.length > 0 ? (
      <div className='row mt-4'>
        {data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    ) : (
      <p>No Projects</p>
    )}
  </>
    
  )
}
