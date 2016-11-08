import React from 'react'

const CookingToday = (props) => {
  const accordionClass = props.isExpanded ? 'active' : ''
  const caretClass = !props.isExpanded ? 'fa-caret-right' : 'fa-caret-down'

  function missingItem(props) {
    return (
      <li className="list-group-item">{props.name}</li>
    )
  }
  function missingList(props) {
    const missing = props.recipe.missedIngredients.map(item => item.name)
    return (
      <ul className="list-group">
        {missing.map((item) => <missingItem key={item} name={item}/>)}
      </ul>
    )
  }

  return (
    <div>
      <button className={`accordion ${accordionClass}`} onClick={props.toggleAccordion}>
        <span className={`fa ${caretClass}`}></span>
        {props.recipe.title}
        <a
          className="btn btn-sm btn-default btn-add"
          href={props.recipe.sourceUrl}
          target="_blank" rel="noopener noreferrer"
        >
          <i className="fa fa-2x fa-external-link"/>
        </a>
      </button>
      <div className="panel">
        {
          props.isExpanded ? <missingList/> : null
        }
      </div>
    </div>
  )
}

CookingToday.propTypes = {
  recipe: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    sourceUrl: React.PropTypes.string.isRequired,
    missedIngredients: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  toggleAccordion: React.PropTypes.func.isRequired,
  isExpanded: React.PropTypes.bool.isRequired
}

export default CookingToday