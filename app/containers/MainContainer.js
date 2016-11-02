import React from 'react'
import _ from 'lodash'
import { getFridge } from '../clientapi'

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fridge: null,
      recipes: null,
      display: null,
      isLoading: false
    }
    this.fetchFridge = this.fetchFridge.bind(this)
    this.updateFridge = this.updateFridge.bind(this)
    this.isInFridge = this.isInFridge.bind(this)
  }

  componentDidMount() {
    this.fetchDisplay()
    this.fetchFridge()
  }

  getChildContext() {
    return {
      fridge: this.state.fridge,
      display: this.state.display,
      recipes: this.state.recipes
    }
  }
  
  fetchDisplay() {
    if (this.props.location.pathname === '/') {
      this.setState({ display: 'index' })
    } else if (this.props.location.pathname === '/dashboard') {
      this.setState({ display: 'dash' })
    }
  }

  fetchFridge() {
    getFridge((err, body) => {
      if (!err) {
        this.setState({ fridge: body })
      } else {
        console.log(err)
        // TODO: Display error message if failed to fetch fridge
      }
    })
  }

  updateFridge(action, ingredient) {
    let newFridge = this.state.fridge
    if (action === 'ADD') {
      newFridge.push(ingredient)
    } else if (action === 'DEL') {
      _.remove(newFridge, item => item.id === ingredient.id)
    }
    this.setState({ fridge: newFridge })
  }

  isInFridge(ingredient) {
    return _.find(this.state.fridge, item => item.id === ingredient.id) 
      ? true 
      : false
  }

  render() {
    return (
      <div className="main-container">
        {
          React.cloneElement(this.props.children, {
            updateFridge: this.updateFridge,
            isInFridge: this.isInFridge
          })
        }
      </div>
    )
  }
}

MainContainer.childContextTypes = {
  fridge: React.PropTypes.arrayOf(React.PropTypes.object),
  recipes: React.PropTypes.arrayOf(React.PropTypes.object),
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default MainContainer
