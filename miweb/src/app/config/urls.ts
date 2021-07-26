const URL_ROOT = 'http://127.0.0.1:8000/api/';

const AUTH_SERVICIOS = {
  login: URL_ROOT + 'token/',
  refresh: URL_ROOT + 'token/refresh/',
  register: URL_ROOT + 'register/',
  user: URL_ROOT + 'user/',

  item: URL_ROOT + 'item/',
  img_item: URL_ROOT + 'img-item/',
  estadoItem: URL_ROOT + 'estado/',
  categorias: URL_ROOT + 'categoria/',


  itemsByUser: URL_ROOT + 'itemsByUser/',
  subcatByCat: URL_ROOT + 'subcatByCat/',
  mostRecent: URL_ROOT + 'most-recent/',
  productsByCat: URL_ROOT + 'productsByCat/',
  productsBySubcat: URL_ROOT + 'productsBySubcat/',
};



export default AUTH_SERVICIOS;
