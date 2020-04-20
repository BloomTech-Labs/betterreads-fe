import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ShelfBook from '../../components/library/ShelfBook';
import { initialState as libraryIState } from '../../store/reducers/library';
import { initialState as searchIState } from '../../store/reducers/search';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// Testing Utils
import { renderWithRedux } from '../utils/renderWithRedux';

const testingState = {
  book: {
    currentBook: {
      googleId: 'Gz1jn_5OafMC',
      title: "Wizard's First Rule",
      authors: 'Terry Goodkind',
      description:
        '<p>Millions of readers the world over have been held spellbound by this valiant tale vividly told.</p><p>Now, enter Terry Goodkind\'s world, the world of the Sword of Truth.</p><p>In the aftermath of the brutal murder of his father, a mysterious woman, Kahlan Amnell, appears in Richard Cypher\'s forest sanctuary seeking help ... and more. His world, his very beliefs, are shattered when ancient debts come due with thundering violence.</p><p>In their darkest hour, hunted relentlessly, tormented by treachery and loss, Kahlan calls upon Richard to reach beyond his sword-- to invoke within himself something more noble. Neither knows that the rules of battle have just changed ... or that their time has run out.</p><p>This is the beginning. One book. One Rule. Witness the birth of a legend.</p><p>"Wonderfully creative, seamless, and stirring."--<i>Kirkus Reviews</i></p>',
      categories:
        'Fiction / Fantasy / General,Fiction / Fantasy / Epic,Fiction / Fantasy / Action & Adventure',
      averageRating: 3.5,
      thumbnail:
        'http://books.google.com/books/content?id=Gz1jn_5OafMC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73gIyYf9jVqYTXiE2Zry0O3NsZT8JwZF8kaHF9gD_OumU_qYdY4hYVxa278AtMZevRwcxYokN4YCQZPYoy3WPvrgKmOvpU1oT5C8_aSwkFDOZcPt8qyu28ugySkst7x0UlV0uqt&source=gbs_api',
      smallThumbnail:
        'http://books.google.com/books/content?id=Gz1jn_5OafMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE701m6Rv-UF_5a05sxvSReG_wrJFHqNq5SuMlE_N4RrEc5yCSM6aCJ88juNXyPfjagyCvWEhbF8gJZ9UZynKT4mXDzJWRAv0M6yLd2ylDYhu1L6u2nflfi4Tskz18XBgaaCoXTOs&source=gbs_api',
    },
    breadcrumbs: [{ label: 'Book details', path: null }],
  },
  library: libraryIState,
  search: searchIState,
};

test('can render with redux with defaults', async () => {
  const history = createMemoryHistory({});
  const { findByText, getByTestId } = renderWithRedux(
    <Router history={history}>
      <ShelfBook match={{ params: { id: 'Gz1jn_5OafMC' } }} />
    </Router>,
    { initialState: testingState }
  );
  const description = await findByText(/Millions/i);
  expect(description).toBeTruthy();
  const readMore = getByTestId('read-more');
  expect(readMore).toBeInTheDocument();
  expect(readMore).toHaveTextContent(/Read more.../i);
});
