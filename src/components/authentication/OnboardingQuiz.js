import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendUserGenres } from '../../store/actions';
import { Checkbox } from 'antd';

import OnboardingQuizContainer from './styles/OnboardingQuizStyle';

const OnboardingQuiz = (props) => {
  const [checkedGenres, setCheckedGenres] = useState([]);

  const onChange = (checkedValues) => {
    setCheckedGenres(checkedValues);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(checkedGenres);
  };

  const genres = [
    'Art',
    'Biography',
    'Business',
    'Chick Lit',
    'Christian',
    'Classics',
    'Comics',
    'Contemporary',
    'Cookbooks',
    'Graphic Novels',
    'Historical Fiction',
    'History',
    'Horror',
    'Humor & Comedy',
    'Manga',
    'Memoir',
    'Music',
    'Mystery',
    'Nonfiction',
    'Paranormal',
    'Philosophy',
    'Poetry',
    'Psychology',
    'Religion',
    'Romance',
    'Science',
    'Science Fiction',
    'Self Help',
    'Suspense',
    'Spirituality',
    'Sports',
    'Thriller',
    'Travel',
    'Young Adult',
  ];

  return (
    <OnboardingQuizContainer>
      <h1>Select your favorite genres</h1>
      <p className='select'>Select at least one genre to continue</p>
      <form onSubmit={onSubmit}>
        <Checkbox.Group options={genres} onChange={onChange} />
        <button type='submit'>Continue</button>
      </form>
    </OnboardingQuizContainer>
  );
};

export default connect(null, { sendUserGenres })(OnboardingQuiz);
