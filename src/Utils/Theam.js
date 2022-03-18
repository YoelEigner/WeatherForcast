import configureStore from '../Utils/ReduxStore'

const { store } = configureStore()

const setTheme = (themeName) => {
    store.dispatch({ type: "THEME", payload: themeName })
    document.documentElement.className = themeName;
}

const keepTheme = () => {
    const state = store.getState();
    console.log(state.Theme)
    if (state.Theme === 'theme-dark') {
        setTheme('theme-dark');
    } else if (state.Theme === 'theme-light') {
        setTheme('theme-light')
    } else {
        setTheme('theme-dark')
    }
}

export const Theme = {
    setTheme: setTheme,
    keepTheme: keepTheme
}