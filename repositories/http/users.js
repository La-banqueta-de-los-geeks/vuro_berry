const axios = require('axios');
const USERS_API = 'https://jsonplaceholder.typicode.com/users/';
class User {
    index() {
        try {
                axios.get(`${USERS_API}`).then(function (response) {
                  const users = response.data;
                  console.log('Users retrieved from the API');
                  console.log(users);
                });
              } catch (err) {
                console.error(err);
              }    
    }
}

module.exports = {User}