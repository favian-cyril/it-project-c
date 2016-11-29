import React from 'react'
import Ingredient from '../components/Ingredient'

const Fridge = props => (
  <div className="card">
    <div className="card-block">
      <h5 className="card-title">
        <span className="bf bf-fridge"></span>
        {props.title}
      </h5>
    </div>
    <div className="list-wrapper">
      <ul className="media-list">
        {
          props.contents.map((item, i) => (
            <Ingredient
              key={i}
              ingredient={item}
              idName={`ingr_${i}`}
              parent={'fridge'}
            />
            )
          )
        }
      </ul>
    </div>
  </div>
)

Fridge.propTypes = {
  title: React.PropTypes.string.isRequired,
  contents: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  updateFridge: React.PropTypes.func.isRequired
}

Fridge.defaultProps = {
  title: 'My Fridge',
  contents: []
}

export default Fridge
