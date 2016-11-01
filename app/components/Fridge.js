import React from 'react'
import Ingredient from './Ingredient'

const Fridge = props => (
  <div className="container fridge">
    <div className="card">
      <div className="card-block">
        <h5 className="card-title">{props.title}</h5>
      </div>
      <div className="list-wrapper">
        <ul className="media-list">
          {
            props.contents.map((item, i) => (
              <Ingredient
                item={item} key={i}
                parent="fridge"
                fridge={props.fridge}
                handleUpdate={props.handleUpdate}
              />
            ))
          }
        </ul>
      </div>
    </div>
  </div>
)

Fridge.propTypes = {
  title: React.PropTypes.string.isRequired,
  contents: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  handleUpdate: React.PropTypes.func.isRequired
}

Fridge.defaultProps = {
  title: 'My Fridge'
}

export default Fridge
