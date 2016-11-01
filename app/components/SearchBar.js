import React from 'react'

const SearchBar = props => (
  <div className="input-group form-group right-inner-addon">
    <input
      className="form-control"
      type="text"
      id="search-input"
      placeholder="Search for ingredients..."
      onChange={props.handleChange}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
    />
    <span className="input-group-addon">
      <i className="fa fa-search"/>
    </span>
  </div>
)


SearchBar.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  handleFocus: React.PropTypes.func.isRequired,
  handleBlur: React.PropTypes.func.isRequired
}

export default SearchBar
