module.exports = (function router () {
  'use strict'

  const crossroads = require('crossroads')
  const hasher = require('hasher')

  let self = {}

  const paths = [
    {
      routes: ['home'],
      template: 'home'
    },
    {
      routes: ['page-1', 'page-2'],
      template: 'page'
    }
  ]

  let controllers = {}
  let views = {}
  let past, current

  for (let i = 0; i < paths.length; i++) {
    let path = paths[i]
    for (var j = 0; j < path.routes.length; j++) {
      var route = path.routes[j]
      controllers[route] = require('../controllers/' + path.template)
      views[route] = require('../../partials/' + path.template + '.html')
    }
  }

  self.init = function init () {
    crossroads.bypassed.add(function (request) {
      crossroads.parse('home/start')
      setHashSilently('home/start')
    })

    crossroads.addRoute('/{route}/{state}/:id:', function (route, state, id) {
      console.log('router.js - route: %s.', route)
      console.log('router.js - state: %s.', state)
      console.log('router.js - id: %s.', id)
      // store the last route
      past = current
      // destroy current controller
      if (self.past) {
        controllers[self.past].destroy()
      }
      // set route view
      setView(views[route])
      // add a class `route` to the body
      setBodyClass(route)
      // init route controller
      controllers[route].init(state, id)
      // listen to state changes
      controllers[route].changedState.add((state) => {
        setHashSilently(route + '/' + state)
      })
      // store current route
      current = route
    })

    hasher.initialized.add(parseHash)
    hasher.changed.add(parseHash)
    hasher.init()
  }

  function setBodyClass (route) {
    document.body.classList.remove(past + '-view')
    document.body.classList.add(route + '-view')
  }

  function parseHash (newHash, oldHash) {
    crossroads.parse(newHash)
  }

  function setHashSilently (hash) {
    hasher.changed.active = false // disable changed signal
    hasher.setHash(hash) // set hash without dispatching changed signal
    hasher.changed.active = true // re-enable signal
  }

  function setView (view) {
    document.querySelector('.main').innerHTML = view
  }

  return self
})()
