import { FormInstance } from "element-plus";
import { ref } from "vue";

export interface orderInt {
  id: number;
  orderNo: string;
  name: string;
  date: string;
  state: string;
  city: string;
  address: string;
  zip: string;
  tag: string;
}
export interface selectData {
  orderNo: string;
  operator: string;
}
export class orderData {
  orderList: orderInt[] = [];
  queryParams: selectData = {
    orderNo: "",
    operator: "",
  };
  showedOrderList: orderInt[] = [];
  queryFormRef = ref<FormInstance>();
  page = 1;
  pageSize = 5;
  total = 0;
  dialogVisible = false;
  activeRow: orderInt = {
    id: -1,
    orderNo: "",
    date: "",
    name: "",
    state: "",
    city: "",
    address: "",
    zip: "",
    tag: "",
  };
}
