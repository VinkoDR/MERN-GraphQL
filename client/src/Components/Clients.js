import React from 'react'
import {  useQuery } from '@apollo/client'
import Spinner from './Spinner';
import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../Queries/clientQueries.js'




export default function Clients() {

  // get info from the query GET_CLIENTS
  const { loading, error, data } = useQuery(GET_CLIENTS)

  if(loading) return <Spinner />
  if(error) return <p>Somethin went wrong</p>

  return (
    <div>{!loading && !error && (
      <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
    )
    }</div>
  )
}
