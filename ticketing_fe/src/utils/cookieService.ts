/*
 * General utils for managing cookies in Typescript.
 */
export function setCookie(name: string, val: string): void {
  const date = new Date();
  const value = val;

  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
}

export function getCookie(cname: string): string {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function deleteCookie(name: string): void {
  const date = new Date();

  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
  document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
}
