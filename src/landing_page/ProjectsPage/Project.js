import React from 'react'

function Project({project_obj}) {

    const title = project_obj.title;


  return (
    <div className='project'>{title}</div>
  )
}

export default Project