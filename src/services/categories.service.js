import {get, post, del} from './apis';
const baseurl = 'api/v1/categories';

export const getAllCategories = async ()=> {
    const categories = await get(baseurl);
    return categories;
}

export const addCategorie = async (categorie)=> {
    const data = { name : categorie }
    const categories = await post(data,baseurl);
    return categories;
}

export const deleteCategorie = async (id)=> {
    const url = baseurl + `categories/${id}`;
    const categories = await del(url);
    return categories;
}

export const categories = {
    getAllCategories,
    addCategorie,
    deleteCategorie
}