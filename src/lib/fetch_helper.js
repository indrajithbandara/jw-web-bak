export const FetchHandleEx = (url, {
  body,
  mode = '',
  cache = '',
  method = 'GET',
  headers = {}
} = {}) => {
  return fetch(url, {body, mode, cache, method, headers}).then(redata => {
    console.log('1', new Date().getTime());
    return redata.ok
      ? Promise.resolve(redata.json())
      : Promise.reject("加载错误")
  }).catch(el => Promise.reject(el));
}

export const FetchHandleExAsync = async(url, {
  body,
  mode = 'cors',
  cache = 'default',
  method = 'GET',
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
} = {}) => {
  return await fetch(url, {body, mode, cache, method, headers})
    .then(redata => redata.ok
      ? Promise.resolve(redata.json())
      : Promise.reject("加载错误"))
    .then(redata => redata.Re_state == 200
      ? Promise.resolve(redata.Re_data)
      : Promise.reject(redata.Re_message))
    .catch(el => Promise.reject(el));
}

export const FetchHandleExAsync2 = async(url, {
  body,
  mode = 'cors',
  cache = 'default',
  method = 'GET',
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
} = {}) => {
  return await fetch(url, {body, mode, cache, method, headers})
    .then(redata => redata.ok
      ? Promise.resolve(redata.json())
      : Promise.reject("加载错误"))
    .then(redata => redata.Re_state == 200
      ? Promise.resolve(redata.Re_data)
      : Promise.reject(redata.Re_message))
    .catch(el => Promise.reject(el));
}

export const FetchHandle = (url) => {
  return fetch(url).then(redata => redata.ok
    ? Promise.resolve(redata.json())
    : Promise.reject("加载错误")).catch(el => Promise.reject(el));

}

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}
