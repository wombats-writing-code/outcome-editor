import React from 'react'
import { IndexLink, Link } from 'react-router'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './Header.scss'

export const Header = (props) => (

  <div className="header flex-container align-center space-between">
    <div className="flex-container align-center wrap">
      <p className="header__title">Graph Studio</p>
      <Select className="select-collection" placeholder="Select a collection"
              value="one"
              labelKey={"displayName"}
              options={props.collections}
              onChange={(d) => props.onSelectCollection(d)}
            />
    </div>



    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {/* {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link> */}
  </div>
)

export default Header
