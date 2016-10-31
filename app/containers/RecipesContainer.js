import React from 'react'
import Recipe from '../components/Recipe'
import Preloader from '../components/Preloader'
import { searchResults } from '../clientapi'


export default class RecipesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      page: 1,
      isLoading: true
    }
    this.getResults = this.getResults.bind(this)
  }

  getResults() {
    this.setState({ isLoading: true })
    const that = this
    const fridgeList = this.context.fridge.map(item => item.name)
    searchResults(fridgeList, this.state.page, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        const recipes = []
        console.log(body)
        body.matches.forEach((i) => {
          recipes.push(i)
        })
        that.props.handleUpdateRecipes(recipes)
        that.setState({ isLoading: false })
      }
    })
  }

  componentWillUpdate(nextContext) {
    if (nextContext.fridge) {
      this.setState({ page: 1, recipes: [] })
      this.getResults()
    }
  }

  componentDidMount() {
    if (this.context.fridge) {
      this.setState({ page: 1, recipes: [] })
      this.getResults()
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
    this.getResults()
  }

  render() {
    let results

    if (this.state.isLoading) {
      results = (<Preloader/>)
    } else {
      results = this.context.recipes.map((item, i) =>
        <Recipe recipe={item}
          key={i}
          parent="recipe"
          handleUpdateRecipes={this.props.handleUpdateRecipes}
        />

      )
    }

    return (
      <div className="card">
        <div className="card-block recipe-card">
          <h4 className="card-title">Recipe Results</h4>
        </div>
        <div className="recipe-list-wrapper">
          <ul className="media-list">
            {results}
          </ul>
        </div>
      </div>
    )
  }
}
RecipesContainer.contextTypes = {
  fridge: React.PropTypes.array,
  recipes: React.PropTypes.array
}
