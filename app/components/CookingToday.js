import React from 'react'
import CookingTodayIngredient from './CookingTodayIngredient'

const CookingToday = (props) => {
  const missing = props.recipe.missedIngredients.map(item => item.name)
  const accordionClass = props.isExpanded ? ' active' : ''
  const caretClass = !props.isExpanded ? 'fa-caret-right' : 'fa-caret-down'
  const panel = !props.isExpanded ? ' show' : ''

  return (
    <div>
      <button className={`accordion${accordionClass}`} onClick={props.toggleAccordion}>
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
      <div className={`panel${panel}`}>
        <ul className="list-group">
          {missing.map((item, i) => <li className="list-group-item" id={i}>{item}</li>)}
        </ul>
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
