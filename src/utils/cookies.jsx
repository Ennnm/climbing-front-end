import jssha from 'jssha';
const { SALT } = process.env;

export const getCookie = (key) => {
  let cookieValue;
  const cookies = document.cookie;
  // check if cookie exists
  if (cookies.includes(key)) {
    // if many cookies
    if (cookies.includes(';')) {
      // eslint-disable-next-line prefer-destructuring
      cookieValue = cookies
        .split('; ')
        .find((row) => row.startsWith(`${key}=`))
        .split('=')[1];
    } else {
      // eslint-disable-next-line prefer-destructuring
      cookieValue = cookies.split('=')[1];
    }
  } else {
    cookieValue = false;
  }
  return cookieValue;
};

export const createCookie = (key, value) => {
  document.cookie = `${key}=${value}`;
};

export function getHash(input) {
  // eslint-disable-next-line new-cap
  const shaObj = new jssha('SHA-512', 'TEXT', { encoding: 'UTF8' });
  const unhasedString = `${input}-${SALT}`;
  shaObj.update(unhasedString);

  return shaObj.getHash('HEX');
}
export const createLoginCookie = (value) => {
  document.cookie = `user=${value}`;
  document.cookie = `isLoggedIn=${getHash(value)}`;
};
