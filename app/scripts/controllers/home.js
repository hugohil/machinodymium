module.exports = (function home () {
  'use strict'

  let ctrl = {}
  let machina = require('machina')
  let fsm = {}

  ctrl.init = function init () {
    console.log('home.js - init home controller.')

    fsm = new machina.Fsm({
      initialize: function (options) {
        console.log('home.js - initializing FSM.')
      },
      namespace: 'home-signal',
      initialState: 'unintialized',
      states: {
        unintialized: {
          next: 'green'
        },
        green: {
          _onEnter: function () {
            // console.log('home.js - entering green state.')
            document.querySelector('.light').className = 'light green'
          },
          next: 'yellow',
          _onExit: function () {
            // console.log('home.js - exiting green state.')
            clearTimeout(this.timer)
          }
        },
        yellow: {
          _onEnter: function () {
            // console.log('home.js - entering yellow state.')
            document.querySelector('.light').className = 'light yellow'
          },
          next: 'red',
          _onExit: function () {
            // console.log('home.js - exiting yellow state.')
            clearTimeout(this.timer)
          }
        },
        red: {
          _onEnter: function () {
            // console.log('home.js - entering red state.')
            document.querySelector('.light').className = 'light red'
          },
          next: 'green',
          _onExit: function () {
            // console.log('home.js - exiting red state.')
            clearTimeout(this.timer)
          }
        }
      },
      next: function () {
        this.handle('next')
      }
    })

    fsm.on('*', function (eventName, data) {
      console.log('home.js - %s happened', eventName)
      if (data.action) {
        console.log('home.js - %s from %s to %s.', data.action, data.fromState, data.toState)
      }
    })

    fsm.next()
  }

  ctrl.destroy = function destroy () {
    ctrl = {}
    fsm = null
  }

  return ctrl
})()
