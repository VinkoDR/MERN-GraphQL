import React from 'react'
import Client from '../Components/Clients'
import Projects from '../Components/Projects'
import AddClientModal from '../Components/AddClientModal'
import AddProjectModal from '../Components/AddProjectModal'

export default function Home() {
  return (
    <>
        <div className='d-flex gap-3 mb-4'>
            <AddClientModal />
            <AddProjectModal />
        </div>
        <Projects />
        <hr />
        <Client />

    </>
  )
}