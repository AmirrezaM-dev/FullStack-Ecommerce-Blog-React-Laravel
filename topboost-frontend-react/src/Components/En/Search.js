import React from 'react'

const Search = () => {
	return (
		<div className="nk-search">
			<div className="container">
				<form action="#">
					<fieldset className="form-group nk-search-field">
						<input type="text" className="form-control" id="searchInput" placeholder="Search..." name="s" />
						<label htmlFor="searchInput"><i className="ion-ios-search" /></label>
					</fieldset>
				</form>
			</div>
		</div>
	)
}

export default Search
