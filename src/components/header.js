import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import { Auth } from "aws-amplify"

import { connect } from "react-redux"
import { StyledHeader } from "../styles/StyledHeader"
import { setSignedIn } from "../redux/actions/userActions"

const Header = ({ siteTitle, user, setSignedIn }) => {
  const onClick = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err))
    setSignedIn(false)
  }

  return (
    <StyledHeader>
      <div>
        <Link to="/">{siteTitle}</Link>
      </div>
      {user.user && user.signedIn && (
        <>
          <div>{user.user.id}</div> <button onClick={onClick}>LogOut</button>{" "}
        </>
      )}
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
export default connect(mapStateToProps, { setSignedIn })(Header)
