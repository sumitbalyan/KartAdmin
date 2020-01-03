import {get, post, del} from './apis';
const baseurl = 'api/v1/subcategories';

export const getAllSubCategories = async ()=> {
    const categories = await get(baseurl);
    return categories;
}

export const addSubCategorie = async (categorie)=> {
    const data = { name : categorie }
    const categories = await post(data,baseurl);
    return categories;
}

export const deleteSubCategorie = async (id)=> {
    const url = baseurl + `/${id}`;
    const categories = await del(url);
    return categories;
}

export const subcategories = {
    getAllSubCategories,
    addSubCategorie,
    deleteSubCategorie
}