
import React from "react";
import { connect } from "react-redux";
import { fetchBook } from "../actions/Actions";

function BookDetails(props) {
    let book =

        title: props.title,
        authors: props.authors,
        publisher: props.publisher,
        publishDate: props.publishDate,
        description: props.description,
        isbn10: props.isbn10,
        isbn13: props.isbn13,
        pageCount: props.pageCount,
        categories: props.categories,
        thumbnail: props.thumbnail,
        smallThumbnail: props.smallThumbnail,
        language: props.language,
        webRenderLink: props.webRenderLink,
        textSnippet: props.textSnippet,
        isEbook: props.isEbook;

    return (
        <div>

            <img href={props.thumbnail} />
            <h2>title</h2>
            {props.authors.map(author =>
                author = <p>author</p>
            )}

        </div>
    )

}


const mapStateToProps = state => {
    return {
        book: state.book,
        error: state.error,
        isFetching: state.isFetching
    }
};

export default connect(
    mapStateToProps, { fetchBook }
)(BookDetails);