export interface ExtraItem {
  option: string;
  price?: number;
}

export interface Extra {
  id: number;
  title: string;
  itens: ExtraItem[];
}

export interface TicketItemModel {
  name: string;
  price: number;
  quantity: number;
  extras?: Extra[];
  note?: string;
}
