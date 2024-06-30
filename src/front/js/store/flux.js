const getState = ({getStore, getActions, setStore}) => {
	return {
		store: {
			message: null,
			demo: [{title: "FIRST", background: "white", initial: "white"}],
			isLogin: false,
			user: '',
			is_admin:false,
			criminals:[],
			toptencriminals: [],
			mostwantedterrorists: [],
			missingFromCriminals: []
			

			
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
			getCriminals: async ()=>{
				const response = await fetch ("https://opulent-space-zebra-pjj675j6wjj7frg7j-3001.app.github.dev/api/criminals");
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				console.log(data)
				setStore({criminals: data.results})
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

		}
	};
};


export default getState;
