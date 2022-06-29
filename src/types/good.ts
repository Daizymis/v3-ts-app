export interface good {
  id: string | number;
  name: string;
  title: string;
  unit: number; //单价
  sales: string; //销量
  discounts?: string; //优惠策略
  isOnsale?: boolean; //tag
  img?: string;
  tag?: string[];
  categoryId?: string | number;
}
