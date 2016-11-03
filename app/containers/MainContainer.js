import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import { browserHistory } from 'react-router'
import Preloader from '../components/Preloader'
import { getFridge, searchResults } from '../clientapi'
import { REDIRECT_INGR_THRESHOLD } from '../config/constants'

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      fridge: [],
      recipes: [],
      display: null,
      isLoading: false,
      recipePage: 1
    }
    this.fetchFridge = this.fetchFridge.bind(this)
    this.updateFridge = this.updateFridge.bind(this)
    this.isInFridge = this.isInFridge.bind(this)
    this.fetchRecipes = this.fetchRecipes.bind(this)
    this.mapMissing = this.mapMissing.bind(this)
    this.viewMore = this.viewMore.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  getChildContext() {
    return {
      fridge: this.state.fridge,
      display: this.state.display,
      recipes: this.state.recipes
    }
  }

  componentDidMount() {
    this.fetchDisplay()
    this.fetchFridge((err) => {
      if (err) {
        this.handleError(err)
      } else if (this.state.fridge.length > 0) {
        this.fetchRecipes((_err) => {
          if (_err) this.handleError(_err)
          else this.setState({ ready: true })
        })
      } else {
        this.setState({ ready: true })
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.fetchDisplay(nextProps.location.pathname)
    }
    if (nextState.fridge.length !== this.state.fridge.length) {
      if (nextState.fridge.length < REDIRECT_INGR_THRESHOLD &&
        this.state.fridge.length === REDIRECT_INGR_THRESHOLD) {
        browserHistory.push('/')
      } else if (nextState.fridge.length === REDIRECT_INGR_THRESHOLD &&
        this.state.fridge.length < REDIRECT_INGR_THRESHOLD) {
        browserHistory.push('/dash')
      }
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.fridge.length !== this.state.fridge.length) {
      console.log('fridge updated, fetching recipes')
      this.fetchRecipes((err) => {
        if (err) this.handleError(err)
      })
    }
  }

  fetchDisplay(pathname) {
    console.log('fetchDisplay called')
    if (pathname === '/') {
      this.setState({ display: 'index' })
    } else if (pathname === '/dash') {
      this.setState({ display: 'dash' })
    }
  }

  fetchFridge(cb) {
    getFridge((err, body) => {
      if (!err) {
        this.setState({ fridge: body })
        cb(null)
      } else {
        this.handleError(err, cb)
      }
    })
  }

  fetchRecipes(cb) {
    this.setState({ isLoading: true, recipes: [] })
    const fridgeList = this.state.fridge.map(item => item.name)
    searchResults(fridgeList, this.state.recipePage, (err, body) => {
      if (!err) {
        const recipeResults = this.mapMissing(body.matches)
        this.setState({ recipes: recipeResults })
        cb(null)
      } else {
        this.handleError(err, cb)
      }
      this.setState({ isLoading: false })
    })
  }
  
  updateFridge(action, ingredient) {
    const newFridge = this.state.fridge.slice()
    if (action === 'ADD') {
      newFridge.push(ingredient)
    } else if (action === 'DEL') {
      _.remove(newFridge, item => item.id === ingredient.id)
    }
    this.setState({ fridge: newFridge })
  }

  isInFridge(ingredient) {
    const found = _.find(this.state.fridge, item => item.id === ingredient.id)
    return found !== undefined
  }
  
  mapMissing(recipeResults) {
    return recipeResults.map((recipe) => {
      const ingredients = recipe.ingredients
      const fridge = this.state.fridge
      recipe.missing = _.differenceBy(ingredients, fridge, 'name')
      return recipe
    })
  }
  
  viewMore() {
    const nextPage = this.state.recipePage + 1
    const fridgeList = this.state.fridge.map(item => item.name)
    this.setState({ isLoading: true, recipePage: nextPage })
    const recipeResults = $('.recipe-list-wrapper')
    if (recipeResults[0]) {
      recipeResults.animate(
        { 'scrollTop': recipeResults[0].scrollHeight },
        { duration: 1000, specialEasing: { height: 'easeOutCirc', width: 'easeOutCirc' } }
      )
    }
    searchResults(fridgeList, nextPage, (err, body) => {
      if (!err) {
        const recipeResults = this.mapMissing(body.matches)
        this.setState({
          recipes: this.state.recipes.concat(recipeResults),
          isLoading: false
        })
      } else {
        this.setState({ isLoading: false })
      }
    })
  }

  handleError(err, cb = null) {  // eslint-disable-line class-methods-use-this
    /* TODO: Display error on fail to fetch fridge, recipe, etc. */
    console.error(err) // eslint-disable-line no-console
    if (cb) cb(err)
  }

  render() {
    return (
      <div className="main-container">
        {
          this.state.ready
            ? React.cloneElement(this.props.children, {
              updateFridge: this.updateFridge,
              isInFridge: this.isInFridge,
              viewMore: this.viewMore,
              isLoading: this.state.isLoading
            })
            : <div className="absolute-center"><Preloader/></div>
        }
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string
  })
}

MainContainer.childContextTypes = {
  fridge: React.PropTypes.arrayOf(React.PropTypes.object),
  recipes: React.PropTypes.arrayOf(React.PropTypes.object),
  display: React.PropTypes.oneOf(['index', 'dash'])
}

export default MainContainer
