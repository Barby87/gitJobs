const base_url = 'http://localhost:3000';
const userList = document.getElementById("userList");

const getUsers = async () => {
    try {
        const resp = await axios.get(`${base_url}/users/`);
        const users = resp.data;
        console.log('users', users);
        

        $.each(users, function(i,e,a){
            console.log('element', e);
            $('#userList').append(`<tr id='rowTable${i}'></tr>`);
            $('#rowTable'+i).append(`<td>${e.name} ${e.lastname}</td>`);
            $('#rowTable'+i).append(`<td>${e.email}</td>`);
            $('#rowTable'+i).append(`<td>${e.created_at}</td>`);
        });
    } catch (e) {
        console.error(e);
    }
};

getUsers();
