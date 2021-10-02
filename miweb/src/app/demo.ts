export class Demo {

  public static getAnuncios(): any[] {
    const anuncios = [
      {
        "id": 1,
        "dateCreated": "2021-08-12T00:00:00Z",
        "banner": "https://blog.mailrelay.com/wp-content/uploads/2018/03/anuncios-publicitarios.png",
        "titulo": "Bienvenido a KIOSKU",
        "descripcion": "Comienza la compraventa de artículos de segunda mano"
      },
      {
        "id": 2,
        "dateCreated": "2021-08-12T00:00:00Z",
        "banner": "https://www.grid.cl/blog/wp-content/uploads/2019/01/15-tipos-de-publicidad-y-anuncios-en-marketing-digital-696x334.png",
        "titulo": "Descuentos flash",
        "descripcion": "Aprovecha grandes descuentos por tiempo limitado"
      },
      {
        "id": 3,
        "dateCreated": "2021-08-12T00:00:00Z",
        "banner": "https://www.circleone.in/images/products_gallery_images/Sale-Banner85.jpg",
        "titulo": "Nuevos artículos",
        "descripcion": "Explora los productos más recientes de nuestro catálogo"
      },
    ]
    return anuncios;
  }

  public static getProductos(): any[] {
    const productos = [
      {
        "id": 1,
        "peso": "1.10",
        "precio": "75.00",
        "descripcion": "Una pelota duradera 100% elastómero termoplástico. Cámara de butilo para una mejor retención de aire.",
        "dimensiones": "14.45 x 9.84 x 5.55",
        "material": "Sintético",
        "disponible": true,
        "titulo": "Balón de fútbol",
        "thumbnail": "data:image/jpeg;base64,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",
        "cantidad": 4,
        "is_active": true,
        "estado": 1,
        "item": 1,
        "subcategoria": 3,
        "categoria": 1,
        "bodega": 1
      },
      {
        "id": 2,
        "peso": "11.30",
        "precio": "85.00",
        "descripcion": "Estructura triangular y mango de madera cómodo con doble absorción de golpes: esta raqueta de tenis utiliza un marco triangular para absorber los golpes.",
        "dimensiones": "28.25 x 11.5 x 1",
        "material": "Fibra de carbón, Aluminio",
        "disponible": true,
        "titulo": "Raqueta de tenis",
        "thumbnail": "https://m.media-amazon.com/images/I/61GakYbJ7mL._AC_SX679_.jpg",
        "cantidad": 1,
        "is_active": true,
        "estado": 2,
        "item": 2,
        "subcategoria": 2,
        "categoria": 1,
        "bodega": 1
      },
      {
        "id": 3,
        "peso": "100.00",
        "precio": "200.00",
        "descripcion": "Las sillas cuentan con un espaldar alto y asientos rellenos de esponja y tapizados con una tela suave al tacto, que ofrecen mayor comodidad.",
        "dimensiones": "75 x 160 x 110",
        "material": "Madera",
        "disponible": true,
        "titulo": "Juego de comedor",
        "thumbnail": "https://marcimex.vteximg.com.br/arquivos/ids/159156-700-700/14510_mesa-comedor-valenciano-6p_foto1.jpg?v=636831706750600000",
        "cantidad": 5,
        "is_active": true,
        "estado": 3,
        "item": 3,
        "subcategoria": 5,
        "categoria": 2,
        "bodega": 1
      },
      {
        "id": 4,
        "peso": "2.00",
        "precio": "230.00",
        "descripcion": "Camiseta de la primera equipación del F.C. Barcelona de la temporada 2020/2021. Original, edición de jugador.",
        "dimensiones": "48 x 64",
        "material": "Dri-FIT ADV",
        "disponible": false,
        "titulo": "Camiseta Messi FCB 2020/2021",
        "thumbnail": "https://m.media-amazon.com/images/I/710Nsla3TKL._AC_UL1500_.jpg",
        "cantidad": 2,
        "is_active": true,
        "estado": 13,
        "item": 10,
        "subcategoria": 3,
        "categoria": 1,
        "bodega": 1
      }
    ]

    return productos;
  }

  public static getProductosHome(): any[]{
    const productos = [
      {
          "id": 3,
          "item": {
              "id": 3,
              "estado": {
                  "id": 3,
                  "estado": "Por evaluar",
                  "date_updated": "2021-08-21"
              },
              "titulo": "Comedor de madera 6 puestos",
              "descripcion": "Este juego de mesa y sillas están elaboradas en madera de Seike, que destaca su gran resistencia al desgaste, humedad y alta calidad.",
              "cantidad": 1,
              "entrega": "Entregar en oficina-Evaluar en oficina",
              "creditos": 0,
              "thumbnail": "/media/items/img_comedor1.jpeg",
              "propietario": 1
          },
          "categoria": {
              "id": 2,
              "nombre": "Hogar y Jardín"
          },
          "peso": "100.00",
          "precio": "200.00",
          "descripcion": "Las sillas cuentan con un espaldar alto y asientos rellenos de esponja y tapizados con una tela suave al tacto, que ofrecen mayor comodidad.",
          "dimensiones": "75 x 160 x 110",
          "material": "Madera",
          "disponible": true,
          "titulo": "Juego de comedor",
          "thumbnail": "/media/producto/comedor1.jpeg",
          "cantidad": 5,
          "is_active": true,
          "estado": 3,
          "subcategoria": 5,
          "bodega": 1
      },
      {
          "id": 4,
          "item": {
              "id": 10,
              "estado": {
                  "id": 13,
                  "estado": "Aceptado",
                  "date_updated": "2021-08-28"
              },
              "titulo": "Camiseta Messi FCB",
              "descripcion": "Camiseta de la última temporada de Messi en el Barça 2020-2021",
              "cantidad": 1,
              "entrega": "Recoger en domicilio - Evaluar en domicilio",
              "creditos": 310,
              "thumbnail": "/media/items/img_messifcb_lelh1U2.jpeg",
              "propietario": 1
          },
          "categoria": {
              "id": 1,
              "nombre": "Deportes"
          },
          "peso": "2.00",
          "precio": "230.00",
          "descripcion": "Camiseta de la primera equipación del F.C. Barcelona de la temporada 2020/2021. Original, edición de jugador.",
          "dimensiones": "48 x 64",
          "material": "Dri-FIT ADV",
          "disponible": false,
          "titulo": "Camiseta Messi FCB 2020/2021",
          "thumbnail": "/media/producto/img_messi.jpeg",
          "cantidad": 0,
          "is_active": true,
          "estado": 13,
          "subcategoria": 3,
          "bodega": 1
      }
  ]

  return productos;
  }

  public static getMembresias(): any[] {
    const membresias = [
      {
        "id": 1,
        "tipo": "Nivel 0",
        "pct_dscto": "0.00",
        "tarifa": "0.00",
        "valorCredito": "1.00",
        "active": true
    },
    {
        "id": 2,
        "tipo": "Nivel 1",
        "pct_dscto": "10.00",
        "tarifa": "3.00",
        "valorCredito": "0.95",
        "active": true
    },
    {
        "id": 3,
        "tipo": "Nivel 2",
        "pct_dscto": "15.00",
        "tarifa": "5.00",
        "valorCredito": "0.90",
        "active": true
    },
    {
        "id": 8,
        "tipo": "Nivel 3",
        "pct_dscto": "18.00",
        "tarifa": "8.00",
        "valorCredito": "0.80",
        "active": true
    }
    ];

    return membresias;
  }

  public static getCategorias(): any[]{
     const categorias = [
      {
        "id": 1,
        "nombre": "Deportes"
    },
    {
        "id": 2,
        "nombre": "Hogar y Jardín"
    },
    {
        "id": 3,
        "nombre": "Ropa"
    }
    ];

    return categorias;
  }

  public static getSubCategorias(): any[]{
    const subcategorias = [
      {
          "id": 1,
          "nombre": "Ciclismo",
          "categoria": 1
      },
      {
          "id": 2,
          "nombre": "Tenis",
          "categoria": 1
      },
      {
          "id": 3,
          "nombre": "Fútbol",
          "categoria": 1
      },
      {
          "id": 4,
          "nombre": "Muebles de sala",
          "categoria": 2
      },
      {
          "id": 5,
          "nombre": "Cocina y comedor",
          "categoria": 2
      },
      {
          "id": 6,
          "nombre": "Pantalones",
          "categoria": 3
      },
      {
          "id": 7,
          "nombre": "Camisetas",
          "categoria": 3
      },
      {
          "id": 8,
          "nombre": "Abrigos",
          "categoria": 3
      },
      {
          "id": 9,
          "nombre": "Vestidos",
          "categoria": 3
      },
      {
          "id": 10,
          "nombre": "Muebles de patio",
          "categoria": 2
      }
  ];

   return subcategorias;
 }
}
