import React, { Component } from 'react'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import NavigateBeforeIcon from 'material-ui/svg-icons/image/navigate-before'
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next'
import HomeIcon from 'material-ui/svg-icons/action/home'

export default class NavigationV extends Component {

  render() {
    return (
      <BottomNavigation style={{ backgroundColor: 'rgb(232, 232, 232)' }}>
        <BottomNavigationItem
          label="Brefore"
          icon={<NavigateBeforeIcon />}
          onTouchTap={() => this.props.clickBefore()}
          />
        <BottomNavigationItem
          label="Home"
          icon={<HomeIcon />}
          onTouchTap={() => this.props.clickHome()}
          />
        <BottomNavigationItem
          label="Next"
          icon={<NavigateNextIcon />}
          onTouchTap={() => this.props.clickNext()}
          />
      </BottomNavigation>
    )
  }

}