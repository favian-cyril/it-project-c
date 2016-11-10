import React from 'react'

const CookingToday = (props) => {
  const missing = props.recipe.missedIngredients.map(item => item.name)
  const accordionClass = props.isExpanded ? 'active' : ''
  const caretClass = props.isExpanded ? 'fa-caret-down' : 'fa-caret-right'
  const panelClass = props.isExpanded ? 'show' : ''

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
      <div className={`panel ${panelClass}`}>
        <ul className="list-group">
          {
            props.recipe.missedIngredients.map((item, i) => (
                <CookingTodayIngredient
                  key={i}
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
  isExpanded: React.PropTypes.bool.isRequired
}

export default CookingToday