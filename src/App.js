import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";



function App() {
	const [repositories, setRepositories] = useState([])

	useEffect(()=>{
		api.get('repositories').then(response => setRepositories(response.data))
	}, [])

	async function handleAddRepository() {
		const response = await api.post('repositories', {
      url: "https://www.google.com",
      title: "Foodfy",
      techs: ["Node", "Nunjucks"],
		});
		setRepositories([...repositories, response.data])
	}

	async function handleRemoveRepository(id) {
		await api.delete(`repositories/${id}`)
		document.getElementById(id).remove()
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map(repository => (
					<li key={repository.id} id={repository.id}>
						<h2>{repository.title}</h2>
						<button onClick={() => handleRemoveRepository(repository.id)}>
							Remover
						</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
