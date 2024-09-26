import React from 'react'

const HeaderComp = ({first, second}) => {
  return (
    <div>
      <h2 className='text-center sign-up-heading'>{first} <br />{second}</h2>
    </div>
  )
}

export default HeaderComp
