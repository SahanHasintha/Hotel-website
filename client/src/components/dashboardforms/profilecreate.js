import React,{Fragment, useState} from 'react'

const ProfileCreate = () => {
    const [formData, setFormData] = useState({
        name:'', 
        address:'', 
        popularcity:'', 
        todaybestoffer:'', 
        description:'',
        phonenumber:''
    });
    const {name, 
        address, 
        popularcity, 
        todaybestoffer, 
        description,
        phonenumber} = formData;
        
        const onChange = (e) => {
            setFormData({
                ...formData, [e.target.name]:e.target.value
            })
        }
    return (
        <Fragment>
            <h1 style={{color:'#427DD2'}}>Create Profile for service</h1>
                    <form className="ui form">
                        
                        <div className="field">
                            <label>Hotel/Restuarant or Service name</label>
                            <input type="text" name="name" placeholder="Enter the Hotel/Restuarant or Service name"onChange={(e)=>onChange(e)} value={name}/>
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input type="text" name="address" placeholder="Enter the address"onChange={(e)=>onChange(e)} value={address}/>
                        </div>
                        <div className="field">
                            <label>Today best Offer</label>
                            <input type="text" name="todaybestoffer" placeholder="Any special offer"onChange={(e)=>onChange(e)} value={todaybestoffer}/>
                        </div>
                        <div className="field">
                            <label>Phonenumber</label>
                            <input type="text" name="phonenumber" placeholder="Enter the phonenumber"onChange={(e)=>onChange(e)} value={phonenumber}/>
                        </div>
                        <div className="field">
                            <label>Popular City of service located</label>
                            <input type="text" name="popularcity" placeholder="Enter the phonenumber"onChange={(e)=>onChange(e)} value={popularcity}/>
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <textarea type="text" name="description" placeholder="Enter the description" onChange={(e)=>onChange(e)} value={description}/>
                        </div>
                        
                        <input type="submit" className="ui primary button" value="Register" />
                    </form>
        </Fragment>
    )
}

export default ProfileCreate;
