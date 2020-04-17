import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
<div className="ui secondary  menu">
  <Link className="active item" to="/login">
    Login
  </Link>
  <Link className="item" to ="/register">
    Register
  </Link>
  <Link className="item">
    Friends
  </Link>
  <div className="right menu">
    <div className="item">
      <div className="ui icon input">
        <input type="text" placeholder="Search..."/>
        <i className="search link icon"></i>
      </div>
    </div>
    <Link className="ui item" >
      Dashboard
    </Link>
    <Link className="ui item">
      Logout
    </Link>
  </div>
</div>

    )
}

export default NavBar;
