import React from 'react'

const Preloader = () => {
  const imgfile = '/images/spin.gif'
  return (
    <div className="preloader">
      <div className="spinner-wrapper">
        <i className="fa fa-4x fa-spinner fa-spin"/>
      </div>
    </div>
  )
}

export default Preloader
