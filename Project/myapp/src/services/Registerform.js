import axios from 'axios';

// helper to build auth config
const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
};

export async function Register(data){
    return axios.post("http://localhost:7200/register", data, getAuthConfig());
}

export async function UsersLogin(data){
    return axios.post("http://localhost:7200/login", data);
}

export async function UsersRegister(data){
    return axios.post("http://localhost:7200/signup", data);
}

export async function getAllApplications(){
    return axios.get("http://localhost:7200/admin", getAuthConfig());
}

export async function getAllLicenseApplications(){
    return axios.get("http://localhost:7200/license/admin-applications", getAuthConfig());
}

// updateStatus can be called either with an object containing registration_id
// or with (id, data). This function will handle both shapes and include auth header.
export async function updateStatus(idOrData, maybeData){
    let id;
    let data = {};
    if (typeof idOrData === 'object') {
        id = idOrData.registration_id || idOrData.id;
        data = idOrData;
    } else {
        id = idOrData;
        data = maybeData || {};
    }

    if (!id) throw new Error('updateStatus requires a registration id');

    return axios.put(`http://localhost:7200/admin-update/${id}`, data, getAuthConfig());
}

// Update status for license applications (learning/driving)
export async function updateLicenseStatusApi(data){
    return axios.put("http://localhost:7200/license/update-status", data, getAuthConfig());
}

export async function getUserRegistrations(){
    return axios.get('http://localhost:7200/my-registrations', getAuthConfig());
}
