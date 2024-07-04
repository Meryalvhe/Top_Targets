const getState = ({getStore, getActions, setStore}) => {
	return {
		store: {
			message: null,
			demo: [{title: "FIRST", background: "white", initial: "white"}],
			isLogin: false,
			user: '', // user: 1,
			is_admin:false,
			criminals:[],
			missing:[],
			currentCriminal:[{}],
			currentMissingPerson: [{}],
			favoritesCriminals:[{}],
			favoritesMissingPersons:[],
			stories: [],
			currentStory:[],
			toptencriminals: [],
			mostwantedterrorists: [],
			missingFromCriminals: [],
		},
		actions: {
			exampleFunction: () => {getActions().changeColor(0, "green");},  // Use getActions to call a function within a fuction
			changeColor: (index, color) => {
				const store = getStore();  // Get the store
				// We have to loop the entire demo array to look for the respective index and change its color
				const demo = store.demo.map((element, i) => {
					if (i === index) element.background = color;
					return element;
				});
				setStore({ demo: demo });  // Reset the global store
			},
			getMessage: async () => {
					const response = await fetch(process.env.BACKEND_URL + "/api/hello")
					if (!response.ok) {
						console.log("Error loading message from backend", response.status, response.statusText)
						return
					}
					const data = await response.json()
					setStore({ message: data.message })
					return data;  // Don't forget to return something, that is how the async resolves
			},
			setIsLogin: (login) => {setStore({ isLogin: login})},
			setLogout:(logout) => {setStore({ isLogin: logout})},
			setCurrentUser: (user) => {setStore({ user: user})},
			setCurrentCriminal: (id) =>{setStore({currentCriminal:id})},
			setCurrentMissingPerson: (id) =>{setStore({currentCriminal:id})},
			getCriminals: async ()=>{
				const response = await fetch (process.env.BACKEND_URL + "/api/criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				const result = data.results
				const criminals = result.filter(items =>{
					if (items.subjects != "['ViCAP Missing Persons']" && items.subjects != "['ViCAP Unidentified Persons']"){
						return true
					}
				})

				setStore({criminals: criminals})
			},
	
			removeFavoritesCriminals: (remove) =>{
				setStore({favoritesCriminals: getStore().favoritesCriminals.filter((item)=> item != remove)})
				getActions().removeFavoriteCriminalDB(remove)
			},
			addFavoritesMissingPersons: (text) =>{
				if (getStore().favoritesMissingPersons.includes(text)){
					return
				}
				setStore({favoritesMissingPersons: [...getStore().favoritesMissingPersons, text]})	
				
				
			},	
			removeFavoritesMissingPersons: (remove) =>{
				setStore({favoritesMissingPersons: getStore().favoritesMissingPersons.filter((item)=> item != remove)})
				
			},
			addFavoriteCriminalDB: async (id) =>{

				if (getStore().favoritesCriminals.includes(id)){
					return
				}

				const uri =(process.env.BACKEND_URL + "api/saved-criminals")
				const dataToSend ={
					user_id: getStore().user.id,
					criminal_id: id
				}
				console.log(dataToSend)
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
				  console.log (data)
				  
				  // Agregar set Store para poder eliminar el criminal de favorite.
				  setStore({favoritesCriminals: [...getStore().favoritesCriminals, data]})	
			},
			removeFavoriteCriminalDB: async (id) =>{
				const uri = (process.env.BACKEND_URL + `/api/saved-criminals/${id}`)
				const options = {
					method: 'DELETE'
				  };
				  const response = await fetch(uri, options);
				  if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				  };
			},
			getMissing: async ()=>{
				const response = await fetch (process.env.BACKEND_URL + "/api/missing-persons");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				console.log(data)
				setStore({missing: data.results})
			},
			getCurrentStory: async ()=>{
				const response = await fetch (process.env.BACKEND_URL + "/api/");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				console.log(data)
				setStore({currentStory: data.results})
			},
			getTopTenCriminals: async()=>{
				const response = await fetch ("https://api.fbi.gov/wanted/v1/list?poster_classification=ten");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				console.log(data)
				/* const result = data.items
				console.log(result) */

				setStore({toptencriminals: data.items})

			},
			getMostWantedTerrorists: async()=>{
				const response = await fetch ("https://api.fbi.gov/wanted/v1/list?poster_classification=terrorist");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				console.log(data)
				/* const result = data.items
				console.log(result) */

				setStore({mostwantedterrorists: data.items})

			},
			getMissingFromDB: async ()=>{
				const response = await fetch("https://opulent-space-zebra-pjj675j6wjj7frg7j-3001.app.github.dev/api/criminals");
				if (!response.ok){
					console.log('Error');
					return
				}
				const data = await response.json()

				const result = data.results
				console.log(result)

				const items = result.filter(item => {
					if (item.poster_classification == "missing"){
						return true
					}
				})

				/* setStore({missingFromCriminals: items}) */
				setStore({missingFromCriminals: result})
				console.log(items)
			},


			getStories: async ()=>{
				const response = await fetch (process.env.BACKEND_URL + "/api/stories-criminals/user/"+JSON.parse(localStorage.getItem('user')).id);
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				setStore({stories: data.results})	
			},
			addFavoritesCrimianls: (text) =>{
				if (getStore().favoritesCriminals.includes(text)){
					return
				}
				setStore({favoritesCriminals: [...getStore().favoritesCriminals, text]})	
				
			},
			getUser: async ()=>{
				const response = await fetch (process.env.BACKEND_URL + "/api/users/1"); //<int:user_id>
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				
				if(data.user_id==getStore.userId){
					console.log("User in flux")
					console.log(data)
					setStore({user: data.results})
				} 
				
			}, 

		}
	};
};


export default getState;
