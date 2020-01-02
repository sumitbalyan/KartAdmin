import {get, post} from './apis';
const baseurl = 'api/v1/';

export const getAllCategories = async ()=> {
    const url = baseurl + 'categories';
    const categories = await get(url);
    return categories;
}

export const addCategorie = async (categorie)=> {
    const url = baseurl + 'categories';
    const data = { name : categorie }
    const categories = await post(data,url);
    return categories;
}

export const categories = {
    getAllCategories,
    addCategorie
}