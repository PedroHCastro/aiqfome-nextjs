export interface ExtraItem {
  option: string;
  price?: number;
}

export interface Extra {
  id: number;
  title: string;
  items: ExtraItem[];
}

export interface TicketItemModel {
  id: number;
  name: string;
  price: number;
  quantity: number;
  extras?: Extra[];
  note?: string;
}
