// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          // get parameters from post request
          console.log(opts)
          let params = JSON.parse(opts.body);

          // find if any user matches login credentials

          console.log(params)
          if ('dara1' === params.username && 'paroli' === params.password) {
            // if login details are valid return user details and fake jwt token

            let responseJson = {
              id: 1,
              username: 'dara',
              firstName: 'kote',
              lastName: 'janjgava',
              token: 'fake-jwt-token'
            };
            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
          } else {
            // else return error
            reject('Username or password is incorrect');
          }

          return;
        }

        // delete user
        if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1]);
            for (let i = 0; i < users.length; i++) {
              let user = users[i];
              if (user.id === id) {
                // delete user
                users.splice(i, 1);
                localStorage.setItem('users', JSON.stringify(users));
                break;
              }
            }

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });
          } else {
            // return 401 not authorised if token is null or invalid
            reject('Unauthorised');
          }

          return;
        }

        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response));

      }, 500);
    });
  }
}
