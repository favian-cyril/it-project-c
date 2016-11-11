var express = require('express')
var router = express.Router()
var apicalls = require('../modules/apicalls')
var fridge = require('../modules/fridge')
var cooktoday = require('../modules/cookingtoday')

var searchIngredients = apicalls.searchIngredients
var searchResults = apicalls.searchResults

router.get('/ingredients/autocomplete', function (req, res, next) {
  console.log('route: /ingredients/autocomplete')
  var params = req.query
  var searchText = params.query
  var number = params.number
  searchIngredients(searchText, number, function (err, body) {
    if (!err) {
      res.json(body)
    } else {
      res.status(500).json(err)
      console.error(err)
      console.log(err.stack)
    }
  })
})

router.get('/recipes/results', function (req, res, next) {
  var params = req.query
  var ingredients = JSON.parse(params.ingredients)
  var page = parseInt(params.page)
  searchResults(ingredients, page, function (err, body) {
    if (!err) {
      res.json(body)
    } else {
      res.status(500).json(err)
      console.error(err)
    }
  })
})

router.post('/fridge/add', function (req, res, next) {
  fridge.addIngredient(req, function (err) {
    if (!err) {
      console.log(`Added ${req.body.item.name} to fridge!`)
      res.status(200).end()
    } else {
      console.log('Failed to save to database.')
      next(err)
    }
  })
})

router.post('/fridge/del', function (req, res, next) {
  fridge.delIngredient(req, function (err) {
    if (!err) {
      console.log(`Deleted ${req.body.item.name} from fridge!`)
      res.status(200).end()
    } else {
      console.log('Failed to delete from database.')
      next(err)
    }
  })
})

router.get('/fridge/get', function (req, res, next) {
  fridge.getFridge(req, function (err, fridge) {
    if (!err) {
      console.log('Fridge fetched from database!')
      res.json(fridge)
    } else {
      console.log('Failed to fetch from database.')
      next(err)
    }
  })
})

router.post('/cooktoday/add', function(req, res, next) {
  cooktoday.addCookToday(req, function(err) {
    if (!err) {
      console.log(`Added ${req.body.item} to Cooking Today`)
      res.status(200).end()
    } else {
      console.log('Failed to add')
      next(err)
    }
  })
})

router.get('/cooktoday/get', function(req, res, next) {
  cooktoday.getCookToday(req, function(err, cooktoday) {
    if (!err) {
      console.log('CookingToday fetched from database!')
      res.json(cooktoday)
    } else {
      console.log('Failed to fetch')
      next(err)
    }
  })
})

module.exports = router
