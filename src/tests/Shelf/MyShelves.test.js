import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyShelves from '../../components/Shelf/MyShelves';
// Testing Util
import { renderWithRedux } from '../utils/renderWithRedux';

const testingState = {
  library: {
    userBooks: [
      {
        readingStatus: 1,
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
      {
        readingStatus: 2,
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
};

const testingState2 = {
  library: {
    userBooks: [
      {
        readingStatus: 1,
        googleId: 'Gz1jn_5OafMC',
        title: "Wizard's First Rule",
        authors: 'Terry Goodkind',
        description:
          '<p>Millions of readers the world over have been held spellbound by this valiant tale vividly told.</p><p>Now, enter Terry Goodkind\'s world, the world of the Sword of Truth.</p><p>In the aftermath of the brutal murder of his father, a mysterious woman, Kahlan Amnell, appears in Richard Cypher\'s forest sanctuary seeking help ... and more. His world, his very beliefs, are shattered when ancient debts come due with thundering violence.</p><p>In their darkest hour, hunted relentlessly, tormented by treachery and loss, Kahlan calls upon Richard to reach beyond his sword-- to invoke within himself something more noble. Neither knows that the rules of battle have just changed ... or that their time has run out.</p><p>This is the beginning. One book. One Rule. Witness the birth of a legend.</p><p>"Wonderfully creative, seamless, and stirring."--<i>Kirkus Reviews</i></p>',
        categories:
          'Fiction / Fantasy / General,Fiction / Fantasy / Epic,Fiction / Fantasy / Action & Adventure',
        averageRating: 3.5,
        smallThumbnail:
          'http://books.google.com/books/content?id=Gz1jn_5OafMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE701m6Rv-UF_5a05sxvSReG_wrJFHqNq5SuMlE_N4RrEc5yCSM6aCJ88juNXyPfjagyCvWEhbF8gJZ9UZynKT4mXDzJWRAv0M6yLd2ylDYhu1L6u2nflfi4Tskz18XBgaaCoXTOs&source=gbs_api',
      },
    ],
  },
};

test('AddToExistingShelf Renders', () => {
  renderWithRedux(<MyShelves />, { initialState: testingState });
});

test('AddToExistingShelf Renders', () => {
  const { getByTestId } = renderWithRedux(<MyShelves />, {
    initialState: testingState2,
  });
  const h2 = getByTestId('h2-link');
  expect(h2).toBeInTheDocument();
  fireEvent.click(h2);
  expect(window.location.pathname === '/myshelves').toBeTruthy();
});

test('AddToExistingShelf Shelf Div Routes In Progress Correctly', () => {
  const { getByTestId } = renderWithRedux(<MyShelves />);
  const div = getByTestId('progress-div');
  expect(div).toBeInTheDocument();
  fireEvent.click(div);
  expect(window.location.pathname === '/shelf/inprogress').toBeTruthy();
});

test('AddToExistingShelf Shelf Div Routes To Be Read Correctly', () => {
  const { getByTestId } = renderWithRedux(<MyShelves />);
  const div = getByTestId('to-be-div');
  expect(div).toBeInTheDocument();
  fireEvent.click(div);
  expect(window.location.pathname === '/shelf/toberead').toBeTruthy();
});

test('AddToExistingShelf Shelf Div Routes My Books Correctly', () => {
  const { getByTestId } = renderWithRedux(<MyShelves />);
  const div = getByTestId('my-books');
  expect(div).toBeInTheDocument();
  fireEvent.click(div);
  expect(window.location.pathname === '/shelf/mybooks').toBeTruthy();
});
