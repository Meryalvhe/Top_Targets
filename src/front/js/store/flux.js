const getState = ({getStore, getActions, setStore}) => {
	return {
		store: {
			message: null,
			demo: [{title: "FIRST", background: "white", initial: "white"}],
			isLogin: false,
			user: 1, // user: '',
			userId:1,
			is_admin:false,
			criminals:[],
			missing:[],
			currentCriminal:[{}],
			currentMissingPerson: [{}],
			favoritesCriminals:[{idSavedCriminal: 30,
                criminalId: 2}],
			favoritesMissingPersons:[],
			stories: [],
			toptencriminals: [],
			mostwantedterrorists: [],
			currentTopTenCriminals:[{}],
			currentTopTenCriminalsComments:[{}],
			currentMostWantedTerroristsComments: [{}],
			currentMostWantedTerrorists: [{}],
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
			addFavoritesCriminals: (text) =>{
				if (getStore().favoritesCriminals.includes(text)){
					return
				}
				setStore({favoritesCriminals: [...getStore().favoritesCriminals, text]})	
				getActions().addFavoriteCriminalDB(text)
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
				const uri =(process.env.BACKEND_URL + "/api/saved-criminals")
				const dataToSend ={
					user_id: getStore().user,
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
				  console.log (data)
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
			getStories: async ()=>{
				const response = await fetch (process.env.BACKEND_URL + "/api/stories-criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				
				if(data.user_id==getStore.userId){
					console.log(data)
					setStore({stories: data.results})
				} 
				
			},
			getTopTenCriminals: async()=>{
				const response = await fetch (process.env.BACKEND_URL + "/api/criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				const result = data.results
				const toptencriminals = result.filter(items =>{
					if (items.poster_classification == "ten"){
						return true
					}
				})
				console.log (toptencriminals)

				setStore({toptencriminals: toptencriminals})

			},
			getMostWantedTerrorists: async()=>{
				const response = await fetch (process.env.BACKEND_URL + "/api/criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				const result = data.results
				const mostwanted = result.filter(items =>{
					if (items.poster_classification == "terrorist"){
						return true
					}
				})
				console.log (mostwanted)

				setStore({mostwantedterrorists: mostwanted})

			},
			getMissingFromDB: async ()=>{
				const response = await fetch(process.env.BACKEND_URL + "/api/criminals");
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
				const response = await fetch (process.env.BACKEND_URL + "/api/stories-criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				
				if(data.user_id==getStore.userId){
					console.log("Stories in flux")
					console.log(data)
					setStore({stories: data.results})
				} 
				
			},
			addFavoritesCrimianls: (text) =>{
				if (getStore().favoritesCriminals.includes(text)){
					return
				}
				setStore({favoritesCriminals: [...getStore().favorites, text]})	
				
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
			setCurrentTopTenCriminal: (id) =>{setStore({currentTopTenCriminals:id})},
			setCurrentMostWantedTerrorist: (id) =>{setStore({currentMostWantedTerrorists:id})},
			setCurrentMissingPerson: (id) =>{setStore({currentCriminal:id})},
		}
	};
};


export default getState;
