import { numericProp } from "vant/lib/utils";

export interface CardProps {
  tag?: string; //图片上标签
  num?: number; //商品数量
  desc?: string; //商品描述
  thumb?: string; //
  title?: string; // 标题
  price?: typeof numericProp; //现价
  centered?: boolean;
  lazyLoad?: boolean;
  currency?: string; //货币符号
  thumbLink?: string; // 图片地址
  originPrice?: typeof numericProp; //
  tags?: Array<string>; // 描述下面的标签
}
