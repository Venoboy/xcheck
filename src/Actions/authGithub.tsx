import { AUTH_GITHUB_SUCCESS } from './actionTypes';
import Service from '../Service/Service';

const querystring = require('querystring');

const CLIENT_ID = 'd43d3462daea6d3d036f';
const CLIENT_SECRET = 'ec5ddb95eac2cbb6f28c31c543dc3fce70bf6d8f';
const REDIRECT_URL = 'https://xcheck-team32.netlify.app/authorization/callback';

const service = new Service();

export function authGithubSuccess(user: Object) {
  return {
    type: AUTH_GITHUB_SUCCESS,
    user,
  };
}

export function getAccessCode() {
  localStorage.setItem('wasRedirected', 'yes');
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
}

export function authGithub(userRole: any) {
  return async (dispatch: Function) => {
    const arr = window.location.search.split('');
    const index = arr.findIndex((item: string) => item === '=');
    const code = arr.slice(index + 1).join('');

    const url = `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;

    const res: any = await fetch(url, {
      method: 'POST',
    });
    const data = await res.text();

    const token = querystring.parse(data).access_token;

    const resUser: any = await fetch(`https://api.github.com/user?access_token=${token}`);
    const userData = await resUser.json();
    const roles = userRole.split(',');

    const user = {
      userName: userData.login,
      githubId: userData.id,
      role: roles,
    };

    await service.postNewUser(user);

    localStorage.setItem('userName', user.userName);
    localStorage.setItem('githubId', user.githubId);
    localStorage.setItem('role', user.role);
    localStorage.setItem('wasRedirected', 'no');

    dispatch(authGithubSuccess(user));
  };
}
