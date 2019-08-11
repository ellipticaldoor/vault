# Other

- make screenshots default to jpg on macos

# Dev

- add playground only on development mode
- generate vaults and missions for development
- delete debug schema/resolvers of disable on production if useful
- run server in production mode
- disable hot reload on cra

# DB

- sync state with db
- periodic save of state on db
- create database for e2e testing, create .env.testing to use in yarn test
- validate vault coordinate doesn't exists before creating a new vault
- query history of combats
  -anyone can see any combat after it happened and related info

# Backend

- Don't allow to see private info from another players
- real time missions update
- to have multiple vaults
- Add a rank system based in points

# UI

- display missions
- if missions screen is empty display a message pointing to new mission
- display facilities in home and resources
- complete empty screen
- create <a> link component instead of global one
- responsive canvas
- responsive UI
- client side input validation
- error message component
- eslint accesibility and a11y
- don't create sourcemaps on build
- client side prediction of resources and ticks
- underline current screen on nav
- display title of the screen on chrome tab
- display vaults info on atlas
- display modal on vault click to show info and attack
- add error message prop to every input
- better select right icon
- handle auth state on screens / routes / state
- error handling, maybe use an error boundary?
- mark user's vault on the atlas
- settings screen
  - dark theme
  - update password
