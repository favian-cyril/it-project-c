import React from 'react'

const Preloader = () => {
  const imgfile = '/images/spin.gif'
  return (
    <div className="preloader">
      <img src={imgfile} className="centered img-responsive" alt="preloader"/>
    </div>
  )
}

export default Preloader
