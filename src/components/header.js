import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { StyledHeader } from "../styles/StyledHeader"
const Header = ({ siteTitle, user }) => {
  return (
    <StyledHeader>
          <div>
            <Link to="/">{siteTitle}</Link>
          </div>
          {user.user && <div>{user.user.id}</div>}
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps)(Header)
