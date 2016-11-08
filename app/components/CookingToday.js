import React from 'react'

const CookingToday = (props, context) => {
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
  const caretClass = !context.isExpanded ? 'fa-caret-right' : 'fa-caret-down'

  return (
    <div>
      <button className="accordion" onClick={context.toggleAccordion}>
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
          context.isExpanded ? <missingList/> : null
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
  }).isRequired
}

CookingToday.contextTypes = {
  isExpanded: React.PropTypes.bool.isRequired,
  toggleAccordion: React.PropTypes.func.isRequired
}

export default CookingToday