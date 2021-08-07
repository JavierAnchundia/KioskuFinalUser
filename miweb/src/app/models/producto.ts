export class Producto {
  id!: string;
  titulo!: string;
  cantidad!: number;
  addedQty!: number;
  categoria?: string;
  precio?: number;
  descripcion!: string;
  thumbnail?: string;
  disponible?: boolean;
  subcategoria?: number;
  peso?: string;
  dimensiones?: string;
}
