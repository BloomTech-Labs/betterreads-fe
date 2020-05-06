import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddToExistingShelf from '../../components/Shelf/AddToExistingShelf';
// Initial States
import { initialState as libraryIState } from '../../store/reducers/library';
import { initialState as searchIState } from '../../store/reducers/search';
import { initialState as recIState } from '../../store/reducers/recommendations';
import { initialState as shelfIState } from '../../store/reducers/shelf';
// Testing Utils
import { renderWithRedux } from '../utils/renderWithRedux';
import { testBook } from '../utils/testingConstants';

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
  shelf: {
    userBooksOnShelves: [
      {
        shelfId: 'Test',
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
    ],
  },
  library: libraryIState,
  search: searchIState,
  reccomendations: recIState,
};

test('AddToExistingShelf Renders', () => {
  renderWithRedux(<AddToExistingShelf />);
});

test('AddToExistingShelf Renders with State', () => {
  renderWithRedux(<AddToExistingShelf />, { initialState: { testingState } });
});

test('AddToExistingShelf Container Renders', () => {
  const { getByTestId } = renderWithRedux(<AddToExistingShelf />, {
    initialState: { testingState },
  });
  const container = getByTestId('shelf-container');
});
