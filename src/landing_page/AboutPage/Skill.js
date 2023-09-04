import React from 'react'

function Skill({skill_obj}) {

    const title = skill_obj.title;
    const icons = skill_obj.icons;

  return (
    <div className='displayed-skill'>

        
        <p className='displayed-skill-name'>{title}</p>
        <div className='displayed-skill-icons'>

            {icons.map((icon) => (

                <div className='displayed-skill-icon'>
            <img src = {icon} alt={title}/>
                </div>
            ))}


        </div>
        

    </div>
  )
}

export default Skill