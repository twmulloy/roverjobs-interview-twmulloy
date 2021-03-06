# Rover Coding Project

## Scenario

Rover's Git repo was involved in a head-on SHA-1 collision and we lost all of our search frontend code. It is your responsibility to write a replacement for our search page using the latest and greatest frontend tech.

##  Core Requirements

Use our [Search API](/search-api.md) endpoint to fetch a list of search results and display them in a reasonable manner. The design and styling of the page are completely up to you. The application should be isomorphic.

- [x] Use a current-generation frontend JavaScript framework
- [x] Pull search results from the Search API endpoint
- [x] Display search results
- [x] You can hard code the geolocation (latitude and longitude) and the service type (e.g. 'overnight-boarding')
- [x] Add search filters for at least date and price
- [x] Use Webpack to bundle assets with separate development and production builds
- [ ] The development environment should have HMR
- [x] The production environment should be server-side rendered (including the initial search results) with client-side hydration
- [x] The layout should be responsive and reflow reasonably on mobile and tablet

## Additional Requirements

Once you have met the core requirements, this is your chance to show us what you're really capable of. Please add a feature or embellishment of your choosing. It doesn't have to be time consuming, just something to showcase your unique talents. Please make sure it doesn't compromise the core requirements.

Please include a README.md describing your design and implementation choices, and with instructions on using your app. We expect to hear back from you within a week.

## Development

### Stack
* [Ruby on Rails](http://rubyonrails.org)
* [React](https://facebook.github.io/react)
* [Node](https://nodejs.org)

### Dependencies
* [Ruby](https://www.ruby-lang.org/en/downloads)
* [Rails](https://github.com/rails/rails)
* [Node](https://nodejs.org/en/download)
* [Yarn](https://yarnpkg.com/lang/en/docs/install)

### Setup

#### MacOS
```
$ gem install bundler foreman
$ bundle && yarn
```

### Commands
```
# Run dependency update
$ npm run update

# Run necessary development web-servers
$ yarn start

# Rails server running on port 3000
$ open http://localhost:3000
```
