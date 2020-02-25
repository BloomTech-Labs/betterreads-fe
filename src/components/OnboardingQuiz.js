import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from "axios"

export function OnboardingQuiz(props) {
	const [genre, setGenre] = useState([]);
	let checkedArr = [];



	function handleChange(event) {
		let genreList = event.target.getAttribute('name')
		
		if (checkedArr.includes(event.target.name)) {
			checkedArr = checkedArr.filter(genre => genre !== event.target.name);
		} else {
            checkedArr.push(genreList);
            console.log(checkedArr, 'checkedArr');
        }
        
    useEffect(() => {
        setGenre(checkedArr);
         
        },[])
	}

    handleSubmit() {
        axios.post('backend', genre)
          .then(response => console.log(response))
          .catch(error => console.log(error))
          
    }

	return (
		<div>
			<div>
				<form>
					<label>
						
						<input
							type="checkbox"
							name="Art"
							value="Art"
							onClick={handleChange}
						/>:Art
                        
					</label>
					<label>
					
						<input
							type="checkbox"
							name="Biography"
							value="Biography"
							onClick={handleChange}
						/>:Biography
                        	
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Business"
							value="Business"
							onClick={handleChange}
						/>:Business
                        
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Chick Lit"
							value="Chick Lit"
							onClick={handleChange}
						/>:Chick Lit
                        
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Christian"
							value="Christian"
							onClick={handleChange}
						/>:Christian
                        
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Classics"
							value="Classics"
							onClick={handleChange}
						/>:Classics
                        
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Comics"
							value="Comics"
							onClick={handleChange}
						/>:Comics
                        
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Contemporary"
							value="Contemporary"
							onClick={handleChange}
						/>:Contemporary
                        
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Cookbooks"
							value="Cookbooks"
							onClick={handleChange}
						/>:Cookbooks
					</label>
					<label>
						<input
							type="checkbox"
							name="Graphic Novels"
							value="Graphic Novels"
							onClick={handleChange}
						/>:Graphic Novels

					</label>
					<label>
						<input
							type="checkbox"
							name="Historical Fiction"
							value="Historical Fiction"
							onClick={handleChange}
						/>:Historical Fiction

					</label>
					<label>
						<input
							type="checkbox"
							name="History"
							value="History"
							onClick={handleChange}
						/>:History

					</label>
					<label>
						<input
							type="checkbox"
							name="Horror"
							value="Horror"
							onClick={handleChange}
						/>:Horror

					</label>
					<label>
						<input
							type="checkbox"
							name="Humor and Comedy"
							value="Humor and Comedy"
							onClick={handleChange}
						/>:Humor and Comedy

					</label>
					<label>
						
						<input
							type="checkbox"
							name="Manga"
							value="Manga"
							onClick={handleChange}
						/>:Manga
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Memoir"
							value="Memoir"
							onClick={handleChange}
						/>:Memoir
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Music"
							value="Music"
							onClick={handleChange}
						/>:Music
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Mystery"
							value="Mystery"
							onClick={handleChange}
						/>:Mystery
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Mystery"
							value="Mystery"
							onClick={handleChange}
						/>:Mystery
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Paranormal"
							value="Paranormal"
							onClick={handleChange}
						/>:Paranormal
					</label>
					<label>
						<input
							type="checkbox"
							name="Philosophy"
							value="Philosophy"
							onClick={handleChange}
						/>:Philosophy

					</label>
					<label>
						<input
							type="checkbox"
							name="Poetry"
							value="Poetry"
							onClick={handleChange}
						/>:Poetry
					</label>

					<label>
						<input
							type="checkbox"
							name="Psychology"
							value="Psychology"
							onClick={handleChange}
						/>:Psychology

					</label>
					<label>
						<input
							type="checkbox"
							name="Religion"
							value="Religion"
							onClick={handleChange}
						/>:Religion

					</label>
					<label>
						<input
							type="checkbox"
							name="Romance"
							value="Romance"
							onClick={handleChange}
						/>:Romance

					</label>
					<label>
						<input
							type="checkbox"
							name="Science"
							value="Science"
							onClick={handleChange}
						/>:Science

					</label>
					<label>
						<input
							type="checkbox"
							name="Science Fiction"
							value="Science Fiction"
							onClick={handleChange}
						/>:Science Fiction

					</label>
					<label>
						<input
							type="checkbox"
							name="Self Help"
							value="Self Help"
							onClick={handleChange}
						/>:Self Help

					</label>
					<label>
						<input
							type="checkbox"
							name="Suspense"
							value="Suspense"
							onClick={handleChange}
						/>:Suspense

					</label>
					<label>
						<input
							type="checkbox"
							name="Spirituality"
							value="Spirituality"
							onClick={handleChange}
						/>:Spirituality

					</label>
					<label>
						<input
							type="checkbox"
							name="Sports"
							value="Sports"
							onClick={handleChange}
						/>:Sports

					</label>
					<label>
						
						<input
							type="checkbox"
							name="Thriller"
							value="Thriller"
							onClick={handleChange}
						/>:Thriller
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Travel"
							value="Travel"
							onClick={handleChange}
						/>:Travel
					</label>
					<label>
						
						<input
							type="checkbox"
							name="Young Adult"
							value="Young Adult"
							onClick={handleChange}
						/>:Young Adult
					</label>

					<input type="submit" value="Submit" />
				</form>
			</div>
		</div>
	);
    }

const mapStateToProps = state => {
	return {
		searchResults: state.searchResults,
		error: state.error,
		Fetching: state.Fetching
	};
};

export default connect(mapStateToProps)(OnboardingQuiz);
