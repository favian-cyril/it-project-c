import React from 'react'
import CookingToday from './CookingToday'

const CookingTodayList = (props) => (
  // Fetch data from props and context, which would be Dashboard
  // Map all props.cookingToday() to create multiple CookingToday
  <div className="card">
    <div className="card-block">
      <h5 className="card-title">Cooking Today</h5>
    </div>
    <div className="list-wrapper">
    {
      props.cookingToday.map((item, i) => (
      <CookingToday
        key={i}
        id={i}
        recipe={item}
        toggleAccordion={props.toggleAccordion}
        isExpanded={props.isExpanded}
      />
      ))
    }

    </div>
    <div className="card-footer">
      <center>
        <button type="button" className="btn btn-danger">Clear All Recipes</button>
        <button type="button" className="btn btn-success">+ Shopping List</button>
      </center>
    </div>
  </div>
)

CookingTodayList.propTypes = {
  title: React.PropTypes.string.isRequired,
  cookingToday: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  toggleAccordion: React.PropTypes.func.isRequired,
  isExpanded: React.PropTypes.shape({
    expand: React.PropTypes.bool.isRequired,
    id: React.PropTypes.number.isRequired
  }).isRequired
}

export default CookingTodayList