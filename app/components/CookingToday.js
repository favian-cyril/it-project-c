import React from 'react'
import CookingTodayIngredient from './CookingTodayIngredient'

const CookingToday = (props) => {
  const missing = props.recipe.missedIngredients.map(item => item.name)
<<<<<<< HEAD
  const accordionClass = props.isExpanded.expand ? 'active' : ''
  const caretClass = props.isExpanded.expand ? 'fa-caret-down' : 'fa-caret-right'
  const panelClass = !props.isExpanded.expand && props.id === props.isExpanded.id ? 'show' : ''

  return (
    <div>
      <button className={`accordion ${accordionClass}`} onClick={() => {props.toggleAccordion(props.id)}} id={props.id}>
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
        <div className={`panel ${panelClass}`} id={props.id}>
        <ul className="list-group">
          {
            props.recipe.missedIngredients.map((item, i) => (
                <CookingTodayIngredient
                  key={i}
                  id={i}
                  ingredient={item}
                />
              )
            )
          }
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
  isExpanded: React.PropTypes.shape({
    expand: React.PropTypes.bool.isRequired,
    id: React.PropTypes.number.isRequired
  }).isRequired,
  id: React.PropTypes.number.isRequired
}

export default CookingToday
