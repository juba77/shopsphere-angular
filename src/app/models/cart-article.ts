import { ProductDTO } from 'src/api-client';

export interface CartArticle {
  product: ProductDTO;
  qte: number;
}
