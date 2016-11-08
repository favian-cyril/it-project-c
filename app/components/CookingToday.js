import React from 'react'

const CookingToday = (props, context) => {
  function missingList(props) {
    return (
      <li className="list-group-item">{props.name}</li>
    )
  }
  function panel(props) {
    const missing = props.recipe.missedIngredients.map(item => item.name)
    return (
      <div className="panel">
        <ul className="list-group">
          {missing.map((item) => <missingList key={item} name={item}/>)}
        </ul>
      </div>
    )
  }
  const caretClass = !context.isExpanded ? 'fa-caret-right' : 'fa-caret-down'

  return (
    <div className="list-wrapper">
      <button className="accordion" onClick={context.toggleAccordion}>
        <span className={`fa ${caretClass}`}></span>
        {props.recipe.title}
        <a
          className="btn btn-default btn-add"
          href={props.recipe.sourceUrl}
          target="_blank" rel="noopener noreferrer"
        >
          <i className="fa fa-2x fa-external-link"/>
        </a>
      </button>
      {
        context.isExpanded ? <panel/> : null
      }
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
  isExpanded: React.PropTypes.bool,
  toggleAccordion: React.PropTypes.func
}

export default CookingToday