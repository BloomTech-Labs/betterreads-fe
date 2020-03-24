import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import {deleteFromCustomShelf, addToCustomShelf, getUserShelves, getBooksOnShelves } from '../../actions'



const AddToExistingShelf = props => {
  console.log(props, "ATES props");
   const bookId = props.bookId
   const book = props.userBooks.find(b => b.googleId === bookId)
  const [isInShelf, setIsInShelf] = useState(false)
  console.log(props.userBooksOnShelves, "UBOS")
 

   useEffect(() => { 
     props.userBooksOnShelves.map( s => s.books.find(b => b.googleId === bookId))
    })

  const onChange = checkedValues => {
    console.log(isInShelf, "IIS")
    if (!isInShelf){
      props.addToCustomShelf(book, checkedValues.target.defaultValue)
      setIsInShelf(true)
    } else {
      props.deleteFromCustomShelf(bookId, checkedValues.target.defaultValue)
      setIsInShelf(false)
    };

  }



    return(
      <div>
          <h2>Your Shelves</h2>
          
          {props.userBooksOnShelves && props.userBooksOnShelves.map( shelf =>
              <Checkbox onChange={onChange} key={shelf.ShelfId} defaultValue={shelf.shelfId}>{shelf.shelfName}</Checkbox>)
          }

      </div>

    )  


}

const mapStateToProps = state => {
	return {
      userShelves: state.shelf.userShelves,
      userBooksOnShelves: state.shelf.userBooksOnShelves,
      userBooks: state.library.userBooks,
	}
};


export default connect(mapStateToProps, { addToCustomShelf, deleteFromCustomShelf, getUserShelves, getBooksOnShelves})(AddToExistingShelf)