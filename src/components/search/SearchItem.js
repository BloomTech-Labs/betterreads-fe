import React from 'react';

const SearchItem = props => {
    const { selfLink, volumeInfo, accessInfo, searchInfo } = props.book;
    
    return (
        <div key={props.id}>
            {volumeInfo.imageLinks.smallThumbnail}
            {volumeInfo.title}
            
        </div>
    )
}

export default SearchItem;