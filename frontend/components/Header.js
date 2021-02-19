import React from "react"
import { useState } from "react"
import NProgress from 'nprogress'
import { APP_NAME } from '../config'
import { signout, isAuth } from '../actions/auth'
import Link from 'next/link'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import Router from "next/router"

import '.././node_modules/nprogress/nprogress.css'
import Search from './blog/Search'

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <a className="navbar-brand">{APP_NAME}</a>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
                  <Link href="/blogs">
                    <NavLink style={{ cursor: 'pointer' }}>
                      Blogs
                    </NavLink>
                  </Link>
                </NavItem>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: 'pointer' }}>
                      Signin
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: 'pointer' }}>
                      Signup
                    </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href='/user'>
                <NavLink style={{ cursor: 'pointer' }}>
                {`${isAuth().name}'s Dashboard`}
                </NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href='/admin'>
                <NavLink style={{ cursor: 'pointer' }}>
                  {`${isAuth().name}'s Dashboard`}
                </NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace('/signin'))}>
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    <Search/>
    </>
  )
}


export default Header