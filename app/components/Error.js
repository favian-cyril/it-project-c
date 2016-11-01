import React from 'react'

const Error = props =>
  <div className="search-error dropdown-menu">
    <h4 className="text-center">{props.msg}</h4>
    <p className="text-center">{props.desc}</p>
  </div>

Error.propTypes = {
  msg: React.PropTypes.string.isRequired,
  desc: React.PropTypes.string
}

export default Error
