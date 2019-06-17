# vue-scmxl-router
> SCXML state machine vue router

[![npm version](https://badge.fury.io/js/vue-scmxl-router.svg)](https://badge.fury.io/js/vue-scmxl-router)
[![Build Status](https://travis-ci.org/zvecr/vue-scmxl-router.svg?branch=master)](https://travis-ci.org/zvecr/vue-scmxl-router)
![Code Status](https://img.shields.io/badge/status-poc-red.svg)

## CURRENTLY POC: API subject to change

`vue-scxml-router` is state machine based router for [Vue.js](http://vuejs.org). It integrates with Vue.js to support well defined and predictable user navigation. Features include:

- State-machine based router configuration
- View transition effects powered by Vue.js' transition system
- Links with automatic active CSS classes

## Motivation

Why another vue-router alternative? For Web Applications (including Hybrid apps) that require users to follow an expected workflow through the system, it can be difficult to guarentee that flow is followed. Overheads can include stopping unwanted jumps through the system, and managing 'userHasDoneX' state. Splitting the navigation model out from the app, and using an existing standard, allows tools to rationalise and visualise a users navigation experiance.

## Usage

TODO: Getting Started

TODO: API docs

## Development Setup

``` bash
# install deps
npm install

# lint files
npm run lint

# run all tests with coverage
npm run coverage

# run all tests
npm test
```
