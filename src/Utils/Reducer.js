const appReducer = (state = {
    Temperature: "Metric",
    Favorites: [],
    Error: "",
    FavoritesWeather: [],
    DefaultCity: "Test",
    Theme: "theme-dark",
    Location: "",
}, action) => {
    switch (action.type) {
        case "TEMPERATURE":
            return { ...state, Temperature: action.payload };
        case "FAVORITES":
            return { ...state, Favorites: [...state.Favorites, action.payload] }
        case "ERROR":
            return { ...state, Error: action.payload };
        case "DEFAULCITY":
            return { ...state, DefaultCity: action.payload };
        case "THEME":
            return { ...state, Theme: action.payload };
        case "LOCATION":
            return { ...state, Location: action.payload };
        default:
            return state;
    }
};

export default appReducer;
