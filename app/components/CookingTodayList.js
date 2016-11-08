import React from 'react'
import CookingToday from './CookingToday'

const CookingTodayList = (props, context) => {
  // Fetch data from props and context, which would be Dashboard
  // Map all props.cookingToday() to create multiple CookingToday
  let results = context.recipes.map((item, i) =>
      <CookingToday key={i} recipe={item}/>
  )
  if (context.recipes.length === 0) {
    results = (
      <div className="list-wrapper">
      </div>
    )
  }
  return (
    <div className="card">
      <div className="card-block">
        <h5 className="card-title">Cooking Today</h5>
      </div>
      {results}
      <div className="card-footer">
        <button type="button" className="btn btn-success">Add to Shopping List</button>
        <button type="button" className="btn btn-danger">Clear All Recipes</button>
      </div>
    </div>
  )
}

CookingTodayList.contextTypes = {
  recipes: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default CookingTodayList