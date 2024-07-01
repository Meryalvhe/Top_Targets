const getState = ({getStore, getActions, setStore}) => {
	return {
		store: {
			message: null,
			demo: [{title: "FIRST", background: "white", initial: "white"}],
			isLogin: false,
			user: '',
			userId:1,
			is_admin:false,
			stories: []
			
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
			//getCriminals:()=>{handle_criminals}

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
				
			}
		}
	};
};


export default getState;
