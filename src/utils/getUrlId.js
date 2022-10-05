
const getUrlId = (url) => {
  return url.split('/').splice(-2, 1)[0];
}

export default getUrlId;