import React from 'react'
import Ingredient from '../components/Ingredient'
import Preloader from '../components/Preloader'
import Error from '../components/Error'

const SuggestionList = (props) => {
  let results
  const status = (props.isFocused && props.searchText.length > 1) ? 'open' : ''
  if (props.isLoading) {
    results = (
      <div className="preloader dropdown-menu">
        <Preloader/>
      </div>
    )
  } else {
    switch (props.errorType) {
      case 'NOTFOUND':
        return <Error msg="No results" desc="Your search did not return any results."/>
      case 'OFFLINE':
        return <Error msg="No connection" desc="Check your internet connection."/>
      default:
        if (props.errorType === null && props.suggestionResults.length) {
          return (
            <ul className="media-list dropdown-menu">
              {
                props.suggestionResults.map((item, i) => (
                  <Ingredient
                    item={item}
                    key={i}
                    listkey={i}
                    fridge={props.fridge}
                    handleUpdate={props.handleUpdate}
                  />
                ))
              }
            </ul>
          )
        }
    }
  }
  return (
    <div className={`dropdown clearfix ${status}`}>
      {results}
    </div>
  )
}

SuggestionList.propTypes = {
  searchText: React.PropTypes.string.isRequired,
  isFocused: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  errorType: React.PropTypes.string.isRequired,
  suggestionResults: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  handleUpdate: React.PropTypes.func.isRequired
}

export default SuggestionList
