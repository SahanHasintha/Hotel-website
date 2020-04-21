import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

const NavBar = ({logout , auth: {isAuthenticated , loading}}) => {

    //*auth users
    return (
      <div className="ui secondary  menu" style={{backgroundColor:"#30BBB2"}}>
        {!loading && isAuthenticated ? <Fragment>
          <div className="left menu">
          <div className="item">
              <h1 className="ui black inverted header">WWW.FINDme.LK</h1>
              <i className="blind icon"></i>
          </div>
          </div>
          <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..."/>
              <i className="search link icon"></i>
            </div>
          </div>
          <Link className="ui item" to="/">
            All items
          </Link>
          <Link className="ui item" to = "/dashboard" >
            Dashboard
          </Link>
          <Link className="ui item" to="/" onClick={()=>logout()}>
            Logout
          </Link>
          </div>
        </Fragment>: (<Fragment>
          <div className="left menu">
            <div className="item">
                <h1 className="ui black inverted header">WWW.FINDme.LK</h1>
                <i className="blind icon"></i>
            </div>
          </div>
          <div className="right menu">
            <div className="item">
              <div className="ui icon input">
                <input type="text" placeholder="Search..."/>
                <i className="search link icon"></i>
              </div>
            </div>
              <Link className="item" to="/login">
                Login
              </Link>
              <Link className="item" to ="/register">
                Register
              </Link>
            </div>
          </Fragment>)}
      </div>
    );

}

const mapStateToProps= (state) => {
  return {
    auth:state.auth
  }
}

export default connect(mapStateToProps, {logout})(NavBar);
