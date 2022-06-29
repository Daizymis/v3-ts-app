import {
  Tabbar,
  TabbarItem,
  Search,
  Picker,
  Field,
  Popover,
  Popup,
  Sticky 
} from "vant";
export function importVant(app: any) {
  app.use(Tabbar);
  app.use(TabbarItem);
  app.use(Search);
  app.use(Picker);
  app.use(Field);
  app.use(Popover);
  app.use(Popup);
  app.use(Sticky );
}
