import React from 'react'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import NavigateBeforeIcon from 'material-ui/svg-icons/image/navigate-before'
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next'
import HomeIcon from 'material-ui/svg-icons/action/home'

const NavigationV = (props) => (
  <BottomNavigation style={{ backgroundColor: 'rgb(232, 232, 232)' }}>
    <BottomNavigationItem
      label="上一张"
      icon={<NavigateBeforeIcon />}
      onTouchTap={() => props.clickBefore()}
      />
    <BottomNavigationItem
      label="主页"
      icon={<HomeIcon />}
      onTouchTap={() => props.clickHome()}
      />
    <BottomNavigationItem
      label="下一张"
      icon={<NavigateNextIcon />}
      onTouchTap={() => props.clickNext()}
      />
  </BottomNavigation>
)

export default NavigationV