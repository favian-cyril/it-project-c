import sinon from "sinon"
import {mount, shallow} from 'enzyme'
import {assert} from 'chai'
import React from 'react'
import FridgeCardContainer from '../app/containers/FridgeCardContainer'
import CardContent from '../app/components/CardContent'
import IngredientSuggestion from '../app/components/IngredientSuggestion'

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView
describe('FridgeCardContainer', function() {
  it('should have a title', function() {
    var input = 'foo'
    var wrapper = mount(<FridgeCardContainer title={input}/>)
    assert.equal(input, wrapper.instance().props.title)
    })
  it("should have settings", function(){
    var settings = {}
    var wrapper = mount(<FridgeCardContainer settings={settings}/>)
    assert.equal(true, wrapper.state('settings') instanceof Object)
  })
  it("should have content", function(){
    var wrapper = shallow(<FridgeCardContainer contents={<CardContent />}/>)
    assert.equal(wrapper.find(CardContent).length, 1)
  })
})
describe('CardContent', function() {
  it('should show list of items', function() {
    var items = [
      {name: 'foo', image: 'bar'},
      {name: 'bar', image: 'foo'}
    ]
    var wrapper = mount(<CardContent contents={items}/>)
    assert.equal(wrapper.find(IngredientSuggestion).length, 2)
  })
})