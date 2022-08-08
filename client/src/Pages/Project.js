import { Link, useParams } from 'react-router-dom'
import Spinner from '../Components/Spinner'
import { useQuery } from '@apollo/client'
import React from 'react'
import ClientInfo from '../Components/ClientInfo'
import DeleteProjectButton from '../Components/DeleteProjectButton'

import { GET_PROJECT } from '../Queries/projectQueries'

export default function Project() {
    const { id } = useParams()
    // get info from the query GET_CLIENTS
    const { loading ,error, data } = useQuery(GET_PROJECT, { variables: {id} })

    if(loading) return <Spinner />
    if(error) return <p>Something went wrong</p>
  console.log(data)
  console.log(error)
  return (
    <>
    {!loading  && (
        <div className="mx-auto w-75 card p-5">
            <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
                Back
            </Link>
            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>

            <h5 className="mt-3">Project Status</h5>
            <p className='lead'>{data.project.status}</p>
            <ClientInfo client={data.project.client} />
            <DeleteProjectButton projectId={data.project.id}/>
        </div>

    )}
    </>
  )
}
