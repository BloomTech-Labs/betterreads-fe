import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import {deleteFromCustomShelf, addToCustomShelf, getUserShelves, getBooksOnShelves } from '../../actions'



const AddToExistingShelf = props => {
  console.log(props, "ATES props");
   const bookId = props.bookId
   const book = props.userBooks.find(b => b.googleId === bookId)
  const [isInShelf, setIsInShelf] = useState(false)
  const [checkedBook, setCheckedBook] = useState([])
  console.log(props.userBooksOnShelves, "UBOS")
  
  
  const books = props.userBooksOnShelves.flatMap(i => i.books);
  const detailbooksShelves = books.filter(i => i.googleId == bookId);
  const shelfIds = detailbooksShelves.map(i => i.shelfId);

  useEffect(key => {
    console.log(key, "CV")
    shelfIds.map( id => {
        if (id === key){
          console.log("hello")
      setIsInShelf(true)
    } else {
      setIsInShelf(false)
      console.log("good bye")
    }
    })
  
    
  },[])
  
  const onChange = checkedValues => {
    console.log(isInShelf, "IIS")
    if (!isInShelf){
      props.addToCustomShelf(book, checkedValues.target.name)
      setIsInShelf(true)
    } else {
      props.deleteFromCustomShelf(bookId, checkedValues.target.name)
      setIsInShelf(false)
    };

  }



    return(
      <div>
          <h2>Your Shelves</h2>
          
          {props.userBooksOnShelves && props.userBooksOnShelves.map( shelf =>
              <Checkbox onChange={onChange} key={shelf.ShelfId} name={shelf.shelfId} checked={isInShelf}>{shelf.shelfName}</Checkbox>)
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