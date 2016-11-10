import React from 'react'

const CookingTodayIngredient = (props) => (
  <li className="list-group-item">{props.ingredient.name}</li>
)

CookingTodayIngredient.propTypes = {
  ingredient: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export default CookingTodayIngredient