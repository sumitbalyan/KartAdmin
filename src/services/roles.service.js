import {get, post, del} from './apis';
const baseurl = 'api/v1/roles';

export const getAllRoles = async ()=> {
    const roles = await get(baseurl);
    return roles;
}

export const addRole = async (role)=> {
    const data = { name : role }
    const roles = await post(data,baseurl);
    return roles;
}

export const deleteRole = async (id)=> {
    const url = baseurl + `/${id}`;
    const role = await del(url);
    return role;
}

export const roles = {
    getAllRoles,
    addRole,
    deleteRole
}