import React from 'react'

export default class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.findMissing = this.findMissing.bind(this)
  }

  componentDidMount() {
    this.findMissing()
  }

  findMissing() {
    const fridge = this.context.fridge.map(item => item.name)
    const ingredients = this.props.recipe.ingredients
    const missing = []
    ingredients.forEach((ingrItem) => {
      const found = fridge.some(fridgeItem =>
         fridgeItem == ingrItem
      )
      if (!found) missing.push(ingrItem)
    })
    const recipes = this.context.recipes
    const idx = recipes.indexOf(recipes.find(r => r.id == this.props.recipe.id))
    recipes[idx].missing = missing
    this.props.handleUpdateRecipes(recipes)
  }

  render() {
    let missingStr = ''
    if (this.props.recipe.missing) {
      this.props.recipe.missing.slice(0, 4).forEach((item) => {
        missingStr = `${missingStr + item}, `
      })
      if (this.props.recipe.missing.length > 3) {
        const number = this.props.recipe.missing.slice(4).length.toString()
        missingStr = `${missingStr} +${number} more`
      }
    }
    return (
      <li className="media ingredient">
        <div className="media-left media-middle">
          <img className="img-rounded" src={this.props.recipe.imageUrlsBySize['90']} alt="90x90" width="90" height="90"/>
        </div>
        <div className="media-body">
          <h5 className="media-heading">{this.props.recipe.recipeName}</h5>
          <small className="missing-str">Missing: { missingStr }</small>
        </div>
        <div className="media-right media-middle">
          <a className="btn btn-default btn-add" href={this.props.recipe.sourceUrl} target="_blank">
            <i className="fa fa-2x fa-external-link btn-add-icon"/>
          </a>
        </div>
      </li>
    )
  }
}

Recipe.contextTypes = {
  fridge: React.PropTypes.array,
  recipes: React.PropTypes.array
}
