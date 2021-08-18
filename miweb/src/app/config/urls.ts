//const URL_ROOT = 'http://192.168.0.4:8080/api/';
const URL_ROOT = 'http://127.0.0.1:8000/api/';

const AUTH_SERVICIOS = {
  mediaURL: 'http://127.0.0.1:8000/static',
  login: URL_ROOT + 'token/',
  refresh: URL_ROOT + 'token/refresh/',
  register: URL_ROOT + 'register/',
  user: URL_ROOT + 'user/',

  item: URL_ROOT + 'item/',
  img_item: URL_ROOT + 'img-item/',
  estadoItem: URL_ROOT + 'estado/',
  categorias: URL_ROOT + 'categoria/',
  producto: URL_ROOT + 'producto/',
  img_producto: URL_ROOT + 'img-producto/',
  shoppingCart: URL_ROOT + 'shopping-cart/',
  ciudad: URL_ROOT + 'citiesByProv/',
  provincia: URL_ROOT + 'provincia/',
  membresia: URL_ROOT + 'membresia/',
  estado: URL_ROOT + 'estado/',
  anuncio: URL_ROOT + 'anuncio/',
  factura: URL_ROOT + 'factura/',
  carro_compras: URL_ROOT + 'carro-compras/',
  carro_producto: URL_ROOT + 'carro-producto/',
  pago: URL_ROOT + 'pago/',
  estado_compra: URL_ROOT + 'estado-compra/',

  itemsByUser: URL_ROOT + 'itemsByUser/',
  subcatByCat: URL_ROOT + 'subcatByCat/',
  mostRecent: URL_ROOT + 'most-recent/',
  productsByCat: URL_ROOT + 'productsByCat/',
  productsBySubcat: URL_ROOT + 'productsBySubcat/',
  update_credits: URL_ROOT + 'update-credits/',
  recentProductsByCat: URL_ROOT + 'recentItemsCat/',
  historial: URL_ROOT + 'historial-compra/',
  orderDetail: URL_ROOT + 'orderDetail/',
};



export default AUTH_SERVICIOS;
