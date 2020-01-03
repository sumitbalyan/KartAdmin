let navigation;
const setNavigation = (localnavigation) => {
    navigation = localnavigation;
}

const getNavigation = () =>{
    return navigation;
}

export const Appnavigation = {
    setNavigation,
    getNavigation
}