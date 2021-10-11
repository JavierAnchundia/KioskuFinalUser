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
        "thumbnail": "https://m.media-amazon.com/images/I/61Hp-6cM6QL._AC_SX425_.jpg",
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

  public static getProductosHome(): any[] {
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
          "thumbnail": "https://marcimex.vteximg.com.br/arquivos/ids/159156-700-700/14510_mesa-comedor-valenciano-6p_foto1.jpg?v=636831706750600000",
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
        "thumbnail": "https://marcimex.vteximg.com.br/arquivos/ids/159156-700-700/14510_mesa-comedor-valenciano-6p_foto1.jpg?v=636831706750600000",
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
          "thumbnail": "https://m.media-amazon.com/images/I/710Nsla3TKL._AC_UL1500_.jpg",
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
        "thumbnail": "https://m.media-amazon.com/images/I/710Nsla3TKL._AC_UL1500_.jpg",
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

  public static getCategorias(): any[] {
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

  public static getSubCategorias(): any[] {
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

  public static getSubmittedItems(): any[] {
    const items =
      [
        [
          {
            "id": 9,
            "estado": {
              "id": 12,
              "estado": "Admitido",
              "date_updated": "2021-08-28"
            },
            "titulo": "Camiseta de messi",
            "descripcion": "Camiseta de messi en su última temporada en el fcb",
            "cantidad": 1,
            "entrega": "Recoger en domicilio - Evaluar en domicilio",
            "creditos": 120,
            "thumbnail": "https://m.media-amazon.com/images/I/61PhvM-RxtL._AC_UY445_.jpg",
            "propietario": 1
          },
          {
            "id": 8,
            "estado": {
              "id": 11,
              "estado": "Rechazado",
              "date_updated": "2021-09-02"
            },
            "titulo": "Silla para patio",
            "descripcion": "El marco principal de las sillas está fabricado de hierro y plástico de alta calidad. El asiento y el respaldo están hechos de tela textilene transpirable que soporta gran peso.",
            "cantidad": 2,
            "entrega": "Recoger en domicilio-Evaluar en oficina",
            "creditos": 130,
            "thumbnail": "https://m.media-amazon.com/images/I/71zSs2PV6bL._AC_SX425_.jpg",
            "propietario": 1
          },
          {
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
            "thumbnail": "https://m.media-amazon.com/images/I/81JAzX8g3xL._AC_SX355_.jpg",
            "propietario": 1
          },
          {
            "id": 2,
            "estado": {
              "id": 2,
              "estado": "Aceptado",
              "date_updated": "2021-08-12"
            },
            "titulo": "Raqueta de tenis",
            "descripcion": "Raqueta de tenis, poco uso, buen estado",
            "cantidad": 5,
            "entrega": "Recoger y evaluar en domicilio",
            "creditos": 80,
            "thumbnail": "https://m.media-amazon.com/images/I/71ibT1m0ryL._AC_SX425_.jpg",
            "propietario": 1
          },
          {
            "id": 1,
            "estado": {
              "id": 1,
              "estado": "Aceptado",
              "date_updated": "2021-08-12"
            },
            "titulo": "Balón de fútbol",
            "descripcion": "Es una pelota resistente a toda intensidad de juego, cubierta de cuero termosoldado que le garantiza mayor durabilidad y resistencia al agua, para que continúe el juego en climas lluviosos o con la cancha mojada.",
            "cantidad": 21,
            "entrega": "En domicilio",
            "creditos": 70,
            "thumbnail": "https://m.media-amazon.com/images/I/71rf+o0P1bL._AC_SX425_.jpg",
            "propietario": 1
          }
        ],
        6
      ];

    return items;
  }
}
