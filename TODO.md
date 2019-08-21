# Dev

- run server in production mode
- generate vaults and missions for development
- disable hot reload on cra
- delete (or disable on production if useful) the schema/resolvers for debug

# DB

- sync state with db
- periodic save of state on db
- create database for e2e testing, create .env.testing to use in yarn test
- validate vault coordinate doesn't exists before creating a new vault
- query history of combats
  -anyone can see any combat after it happened and related info

# Backend

- change joi validation for validator.js
- implement schema resolvers
- Don't allow to see private info from another players
- real time missions update
- to have multiple vaults
- Add a rank system based in points
- Better validation error messages
- instead of '"value" is not allowed to be empty' should be '"username" is not allowed to be empty'

# UI

- transform ticks in seconds
- display missions
  - display resources
  - display times
- debounce submit
- display title of the screen on chrome tab
- client side input validation
- add error message prop to every input
- if missions screen is empty display a message pointing to new mission
- complete empty screens
- display facilities in home and resources
- responsive canvas
- responsive UI
- eslint accesibility and a11y
- don't create sourcemaps on build
- client side prediction of resources and ticks
- display vaults info on atlas
- display modal on vault click to show info and attack
- handle auth state on screens / routes / state
- mark user's vault on the atlas
- settings screen
  - dark theme
  - update password
