import React from 'react'
import { addIngredient, delIngredient } from '../clientapi'
import _ from 'lodash'
import $ from 'jquery'

export default class IngredientSuggestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: null,
      errtype: null,
      message: null,
      added: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.addToFridge = this.addToFridge.bind(this)
    this.delFromFridge = this.delFromFridge.bind(this)
    this.isInFridge = this.isInFridge.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
  }

  componentDidMount() {
    this.setState({ added: this.isInFridge() })
  }

  handleClick(e) {
    const ingredient = this.props.item
    const that = this
    const elemId = `#${that.props.listkey}`
    if (this.state.added) {
      this.delFromFridge(ingredient, () => {
        if ((that.context.fridge.length > 0 && that.context.display == 'dash') ||
        that.context.display == 'index') {
          that.showTooltip(elemId)
        }
      })
    } else {
      this.addToFridge(ingredient, () => {
        if ((that.context.fridge.length < 1 && that.context.display == 'index') ||
          that.context.display == 'dash') {
          that.showTooltip(elemId)
        }
      })
    }
  }

  addToFridge(ingredient, cb) {
    const that = this
    addIngredient(ingredient, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        that.props.handleUpdate('add', ingredient)
        const unmounting = (that.context.fridge.length > 0 && that.context.display == 'index')
        if (!unmounting) {
          that.setState({
            status: 'success',
            message: `Added ${ingredient.name} to fridge!`,
            added: true
          }) }
      } else {
        that.setState({
          status: 'failure',
          message: 'Failed to save to fridge.'
        })
      }
      cb()
    })
  }

  delFromFridge(ingredient, cb) {
    const that = this
    delIngredient(ingredient, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        that.props.handleUpdate('del', ingredient)
        const unmounting = (that.context.fridge.length < 1 && that.context.display == 'dash')
        const ingUnmount = (that.props.parent == 'fridge')
        if (!unmounting && !ingUnmount) {
          that.setState({
            status: 'success',
            message: `Deleted ${ingredient.name} from fridge!`,
            added: false
          }) }
      } else {
        that.setState({
          status: 'failure',
          message: 'Failed to delete from fridge.'
        })
      }
      cb()
    })
  }

  isInFridge() {
    const fridge = this.context.fridge
    const itemIdStr = this.props.item.id
    const results = fridge.filter(item => itemIdStr == item.id)
    return results.length > 0
  }

  showTooltip(elemId) {
    window.showTooltip($(elemId))
    $('.tooltip-inner').last().html(this.state.message)
  }

  render() {
    const imgBaseURL = 'https://spoonacular.com/cdn/ingredients_100x100/'
    const imageURL = imgBaseURL + this.props.item.image
    const name = this.props.item.name
    let buttonClass = ''
    const dataPlacement = (this.context.display == 'index') ? 'right' : 'left'
    if (this.state.added) {
      buttonClass += ' success'
    }
    return (
      <li className="media ingredient" onMouseDown={(e) => { e.preventDefault() }}>
        <div className="media-left media-middle">
          <img className="img-rounded" src={imageURL} alt="40x40" width="40" height="40"/>
        </div>
        <div className="media-body">
          <p className="media-heading">{ name }</p>
        </div>
        <div className="media-right media-bottom">
          <button id={this.props.listkey} onMouseUp={_.debounce(this.handleClick, 1000, { leading: true })}
            className={`btn btn-default btn-add ${buttonClass}`}
            title={this.state.message} data-toggle="tooltip"
            data-container="body" data-placement={dataPlacement}
            data-trigger="manual"
          >
            <i className="fa fa-2x fa-plus btn-add-icon"/>
          </button>
        </div>
      </li>
    )
  }
}

IngredientSuggestion.contextTypes = {
  fridge: React.PropTypes.array,
  display: React.PropTypes.string
}
