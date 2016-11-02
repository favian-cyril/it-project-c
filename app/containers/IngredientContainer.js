import React from 'react'
import $ from 'jquery'
import Ingredient from '../components/Ingredient'
import { browserHistory } from 'react-router'
import { addIngredient, delIngredient } from '../clientapi'

class IngredientContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }

  handleToggle() {
    if (!this.props.isAdded) {
      addIngredient(this.props.ingredient, (err) => {
        if (!err) {
          this.setState({ message: `Added ${this.props.ingredient.name} to fridge!` })
          this.props.updateFridge('ADD', this.props.ingredient)
        }
      })
    } else {
      delIngredient(this.props.ingredient, (err) => {
        if (!err) {
          this.setState({ message: `Deleted ${this.props.ingredient.name} from fridge!` })
          this.props.updateFridge('DEL', this.props.ingredient)
        }
      })
    }
    if (this.context.fridge.length !== 1) {
      this.showTooltip()
    } else if (this.context.display === 'dash') {
      browserHistory.push('/')
    } else {
      browserHistory.push('/dash')
    }
  }

  showTooltip() {
    const elemId = `#${this.props.idName}`
    window.showTooltip($(elemId))
    $('.tooltip-inner').last().dangerouslySetInnerHTML(this.state.message)
  }

  render() {
    return (
      <Ingredient
        ingredient={this.props.ingredient}
        idName={this.props.idName}
        handleToggle={this.handleToggle}
        display={this.context.display}
      />
    )
  }
}

IngredientContainer.propTypes = {
  idName: React.PropTypes.string.isRequired,
  updateFridge: React.PropTypes.func.isRequired,
  ingredient: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    isAdded: React.PropTypes.bool.isRequired
  }).isRequired
}

IngredientContainer.contextTypes = {
  fridge: React.PropTypes.arrayOf(React.PropTypes.object),
  recipes: React.PropTypes.arrayOf(React.PropTypes.object),
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default IngredientContainer
