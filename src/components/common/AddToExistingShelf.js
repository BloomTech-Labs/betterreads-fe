import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import {deleteFromCustomShelf, addToCustomShelf} from '../../actions'
import { fetchUsersShelves } from '../../actions'

const AddToExistingShelf = props => {
const [userShelves, setUserShelves] = useState()



  return(
    <div>
        <h2>Your Shelves</h2>
        {userShelves && userShelves.map( shelf =>

            <CheckBox>{shelf.name}</CheckBox>)}
    </div>

  )  


}

export default connect(null, { addToCustomShelf, deleteFromCustomShelf,  fetchUsersShelves})(AddToExistingShelf);