import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Form extends Component {
  static propTypes = {}
  static defaultProps = {}

  render() {
    return (
      <div>
        <h1>Form</h1>
        <form>
          <ul>
            <li>
              <ul>
                <li>
                  <label>For When You’re Away</label>
                  <ul>
                    <li>
                      <label htmlFor="input_overnight-boarding">Dog Boarding</label>
                      <input id="input_overnight-boarding" type="radio" name="service" value="overnight-boarding" />
                    </li>
                    <li>
                      <label htmlFor="input_overnight-traveling">House Sitting</label>
                      <input id="input_overnight-traveling" type="radio" name="service" value="overnight-traveling" />
                    </li>
                    <li>
                      <label htmlFor="input_drop-in">Drop-In Visits</label>
                      <input id="input_drop-in" type="radio" name="service" value="drop-in" />
                    </li>
                  </ul>
                </li>
                <li>
                  <label>For When You’re At Work</label>
                  <ul>
                    <li>
                      <label htmlFor="input_doggy-day-care">Doggy Day Care</label>
                      <input id="input_doggy-day-care" type="radio" name="service" value="doggy-day-care" />
                    </li>
                    <li>
                      <label htmlFor="input_dog-walking">Dog Walking</label>
                      <input id="input_dog-walking" type="radio" name="service" value="dog-walking" />
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <ul>
                <li>
                  <label htmlFor="input_address">Dog Boarding near</label>
                  <input id="input_address" type="text" name/>
                </li>
                <li>

                </li>
              </ul>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}
