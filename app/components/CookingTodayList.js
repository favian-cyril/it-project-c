import React from 'react'
import CookingToday from './CookingToday'

const CookingTodayList = (props) => {
  // Fetch data from props, which would be Dashboard
  // Map all props.cookingToday() to create multiple CookingToday
  let results = context.recipes.map((item, i) =>
    <CookingToday key={i} recipe={item}/>
  )
  if (props.cookingToday.length > 0) {
    results = props.cookingToday.map((recipe) => {
      return <CookingToday someProp={recipe.prop} />
    })
  }
  return (
    // JSX/HTML markup for the component
    // You will use props here
    <div className="card">
      <div className="card-block">
        <h5 className="card-title">Cooking Today</h5>
      </div>
      <div className="list-wrapper">
        {results}
      </div>
      <div className="card-footer">
        <center>
          <button type="button" className="btn btn-success">Add to Shopping List</button>
          <button type="button" className="btn btn-danger">Clear All Recipes</button>
        </center>
      </div>
    </div>
  )
}

CookingTodayList.propTypes = {
  // props you expect from CookingTodayList
}

CookingTodayList.contextTypes = {
  recipes: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default CookingTodayList