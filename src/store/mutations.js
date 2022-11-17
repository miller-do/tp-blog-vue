module.exports = {
	setAccessToken: (state, accessToken) => {
		state.accessToken = accessToken
	},
	addVisitedRoute: (state, route) => {
		state.visitedRoute.push(route);
	},
	setListSiderMenu:(state,route)=>{
		state.listSiderMenu=route
	},
	closeTabOther:(state,route)=>{
		state.visitedRoute=state.visitedRoute.filter((item)=>item.meta.affix||item.path==route.path)
	},
	closeTabLeft:(state,route)=>{
		let index=state.visitedRoute.length;
		state.visitedRoute=state.visitedRoute.filter((item)=>{
			if (item.path==route.path) index=state.visitedRoute.indexOf(item)
			return item.meta.affix|| index <= state.visitedRoute.indexOf(item)
		})
	},
	closeTabRight:(state,route)=>{
		let index=state.visitedRoute.length;
		state.visitedRoute=state.visitedRoute.filter((item)=>{
			if (item.path==route.path) index=state.visitedRoute.indexOf(item)
			return item.meta.affix|| index >= state.visitedRoute.indexOf(item)
		})
	},
	closeTabAll:(state,route)=>{
		let index=state.visitedRoute.length;
		state.visitedRoute=state.visitedRoute.filter((item)=>{
			if (item.path==route.path) index=state.visitedRoute.indexOf(item)
			return item.meta.affix
		})
	},
}
