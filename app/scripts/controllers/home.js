module.exports = (function home () {
  'use strict'

  let ctrl = {}
  const signals = require('signals')
  let machina = require('machina')
  let fsm = {}

  ctrl.init = function init (state, id) {
    console.log('home.js - init home controller.')

    fsm = new machina.Fsm({
      initialize: function (options) {
        console.log('home.js - initializing FSM.')
      },
      namespace: 'home-signal',
      initialState: 'start',
      states: {
        start: {
          next: (state === 'start') ? 'green' : state
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

    let buttons = document.querySelectorAll('.state-changer')
    for (var i = 0; i < buttons.length; i++) {
      let button = buttons[i]
      button.addEventListener('click', (event) => {
        fsm.next()
      })
    }

    fsm.on('*', function (eventName, data) {
      if (data.action) {
        console.log('home.js - %s from %s to %s.', data.action, data.fromState, data.toState)
        ctrl.changedState.dispatch(data.toState)
      }
    })

    fsm.next()
  }

  ctrl.changedState = new signals.Signal()
  ctrl.changedContent = new signals.Signal()

  ctrl.destroy = function destroy () {
    ctrl = {}
    fsm = null
  }

  return ctrl
})()
