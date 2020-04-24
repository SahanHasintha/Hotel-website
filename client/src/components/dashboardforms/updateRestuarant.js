import React from 'react'

export const UpdateRestuarant = () => {
    return (
        <div >
            <div className="ui middle aligned center aligned grid">
            <div className="column"style={{backgroundColor:"#E5E4E4"}} >
                <h2 className="ui teal image header">
                <div className="content">
                    Log-in to your account
                </div>
                </h2>
                <form className="ui large form">
                <div className="ui stacked segment" style={{backgroundColor:"#E5E4E4"}}>
                    <div className="field">
                    <div className="ui left icon input">
                        <input type="text" name="foodname" placeholder="Enter the foodname"/>
                    </div>
                    </div>
                    <div className="field">
                    <div className="ui left icon input">
                        <input type="text" name="price" placeholder="Enter the price" />
                    </div>
                    </div>
                    <div className="field">
                    <div className="ui left icon input">
                        <textarea type="text" name="description" placeholder="description" />
                    </div>
                    </div>
                    <input type="submit" className="ui fluid large teal submit button" value="Login" />
                    
                </div>

                <div className="ui error message"></div>

                </form>

            </div>
            </div>
        </div>
    )
}

export default UpdateRestuarant;
