export class OrdenCompra {
  id!: number;
  dateCreated!: Date;
  total!: number;
  costoEntrega!: number;
  carro?: string;
  totalCompra?: number;
  estadoCompra!: string;
  pago?: string;
}
