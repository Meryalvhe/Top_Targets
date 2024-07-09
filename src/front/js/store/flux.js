const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{ title: "FIRST", background: "white", initial: "white" }],
			isLogin: false,
			user: [{}], 
			userId: '',
			is_admin: false,
			criminals: [],
			missing: [],
			currentCriminalId: '',
			currentStoryId: 0,
			currentCriminal: [{}],
			currentCriminalComments: [{ user: {} }],
			currentMissingPersonId: '',
			currentMissingPerson: [{}],
			currentMissingPersonComments: [{user: {} }],
			favoritesCriminals: [{criminal: {}}],
			favoritesMissingPersons: [{missing_person: {}}],
			stories: [{ criminal: {} }],
			storiesMissingPersons: [{missing_person: {}}],
			currentStory: {},
			toptencriminals: [],
			mostwantedterrorists: [],
			missingFromCriminals: [],
		},
		actions: {
			setIsLogin: (login) => { setStore({ isLogin: login }) },
			setLogout: (logout) => { setStore({ isLogin: logout }) },
			setCurrentUser: (user) => { setStore({ user: user }) },
			setCurrentCriminal: (id) => { setStore({ currentCriminalId: id })},
			setCurrentMissingPerson: (id) => { setStore({ currentMissingPersonId: id }) },
			setCurrentStory: (story)=>{setStore({currentStory:story})},
			setCurrentCriminalId: (id)=>{setStore({currentCriminalId:id})},
			setCurrentStoryId: (storyId)=>{setStore({currentStoryId:storyId})},
			getLocalStorage: () => {
				if (localStorage.getItem('user')) {
					setStore({ isLogin: 'true' })
					setStore({user: JSON.parse(localStorage.getItem('user'))})
					}
			setStore({currentCriminal: JSON.parse(localStorage.getItem('currentCriminal'))})
			setStore({currentMissingPerson: JSON.parse(localStorage.getItem('currentMissingPerson'))})
			},
			getCriminals: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/criminals/");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				const result = data.results
				const criminals = result.filter(items => {
					if (items.subjects != "['ViCAP Missing Persons']" && items.subjects != "['ViCAP Unidentified Persons']" && items.caution != null) {
						return true
					}
				})
				setStore({ criminals: criminals })
			},
			getCurrentCriminal: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/criminals/" + getStore().currentCriminalId);
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();

				localStorage.setItem('currentCriminal', JSON.stringify(data.results) ),
				setStore({currentCriminal: JSON.parse(localStorage.getItem('currentCriminal'))})
			},
			getCurrentCriminalComments: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/criminals/" + getStore().currentCriminalId + '/comments');
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				setStore({ currentCriminalComments: data.results })
			},
			addCommentCriminal: async (dataToSend) => {
				const uri = (process.env.BACKEND_URL + "/api/comments-criminal")
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					if (response.status == 400) {
						return;
					}
				}
				const data = await response.json();
				getActions().getCurrentCriminalComments()
			},
			addFavoriteCriminalDB: async (id) => {
				const uri = (process.env.BACKEND_URL + "/api/saved-criminals")
				const dataToSend = {
					user_id: getStore().user.id,
					criminal_id: id
				}
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					if (response.status == 400) {
						return;
					}
				}
				const data = await response.json();
				setStore({ favoritesCriminals: [...getStore().favoritesCriminals, data.results] })
			},
			addFavoritesMissingPersons: async (id) => {
				const uri = (process.env.BACKEND_URL + "/api/saved-missing-persons")
				const dataToSend = {
					user_id: getStore().user.id,
					missing_person_id: id
				}
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				console.log(response)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					if (response.status == 400) {
						return;
					}
				}
				const data = await response.json();
				console.log(data.results)
				setStore({ favoritesMissingPersons: [...getStore().favoritesMissingPersons, data.results] })
			},
			removeFavoriteCriminalDB: async (id) => {
				const criminalFavoriteId = getStore().favoritesCriminals.filter((item) => id == item.criminal_id)

				const uri = (process.env.BACKEND_URL + `/api/saved-criminals/${criminalFavoriteId[0].saved_criminal_id}`)
				const options = {
					method: 'DELETE'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				};
				setStore({ favoritesCriminals: getStore().favoritesCriminals.filter((item) => id != item.criminal_id) })
			},
			getMissing: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/missing-persons");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				setStore({ missing: data.results })
			},
			getCurrentMissingPerson: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/missing-persons/" + getStore().currentMissingPersonId);
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				localStorage.setItem('currentMissingPerson', JSON.stringify(data.results) ),
				setStore({currentMissingPerson: JSON.parse(localStorage.getItem('currentMissingPerson'))})
			},
			addFavoritesMissingPersons: async (id) => {
				const uri = (process.env.BACKEND_URL + "/api/saved-missing-persons")
				const dataToSend = {
					user_id: getStore().user.id,
					missing_person_id: id
				}
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					if (response.status == 400) {
						return;
					}
				}
				const data = await response.json();
				setStore({ favoritesMissingPersons: [...getStore().favoritesMissingPersons, data.results] })
			}, 
			removeFavoritesMissingPersons: async (id) => {
				const missingFavoriteId = getStore().favoritesMissingPersons.filter((item) => id == item.missing_person_id)

				const uri = (process.env.BACKEND_URL + `/api/saved-missing-persons/${missingFavoriteId[0].saved_missing_person_id}`)
				const options = {
					method: 'DELETE'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				};
				setStore({ favoritesMissingPersons: getStore().favoritesMissingPersons.filter((item) => id != item.missing_person_id) })

			},
			getCurrentMissingComments: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/missing-persons/" + getStore().currentMissingPersonId + '/comments');
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				console.log(data)
				setStore({ currentMissingPersonComments: data.results })
			},
			addCommentMissingPerson: async (dataToSend) => {
				console.log(dataToSend)
				const uri = (process.env.BACKEND_URL + "/api/comments-missing-persons")
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				console.log(response)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					if (response.status == 400) {
						return;
					}
				}
				const data = await response.json();
				getActions().getCurrentMissingComments()
			},
			getCurrentStory: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/users/" + JSON.parse(localStorage.getItem('user')).id +"/stories-criminals/"+ getStore().currentCriminalId);
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				setStore({ currentStory: data.results })
			},
			getMissingFromDB: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json()
				const result = data.results
				const items = result.filter(item => {
					if (item.poster_classification == "missing") {
						return true
					}
				})
				setStore({ missingFromCriminals: result })
			},
			getStories: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/users/" + JSON.parse(localStorage.getItem('user')).id + "/stories-criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				setStore({ stories: data.results })
			},
			getStoriesMissing: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/users/" + JSON.parse(localStorage.getItem('user')).id + "/stories-missing-persons");
				console.log(response)
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				setStore({ storiesMissingPersons: data.results })
			},
			addFavoritesCrimianls: (text) => {
				if (getStore().favoritesCriminals.includes(text)) {
					return
				}
				setStore({ favoritesCriminals: [...getStore().favoritesCriminals, text] })
			},
			getMostWantedTerrorists: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				const result = data.results
				const mostwanted = result.filter(items => {
					if (items.poster_classification == "terrorist") {
						return true
					}
				})
				setStore({ mostwantedterrorists: mostwanted })
			},
			getTopTenCriminals: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				const result = data.results
				const toptencriminals = result.filter(items => {
					if (items.poster_classification == "ten") {
						return true
					}
				})
				setStore({ toptencriminals: toptencriminals })
			},
			getSavedMissingPersons: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/users/" + JSON.parse(localStorage.getItem('user')).id +"/saved-missing-persons");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				const result = data.results
				setStore({ favoritesMissingPersons: result })
			},
			getSavedCriminals: async () => {
				const response = await fetch(process.env.BACKEND_URL + "/api/users/" + JSON.parse(localStorage.getItem('user')).id +"/saved-criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				const result = data.results
				if(result.length!=0){
					setStore({ favoritesCriminals: result })
				}
			},
		}
	};
};


export default getState;