import {
  Tabbar,
  TabbarItem,
  Search,
  Picker,
  Field,
  Popover,
  Popup,
  Sticky,
} from "vant";
import { App } from "vue";


import {
  CardPlugin,
  PopoverPlugin,
  SearchPlugin
} from 'min-comp';
export function importVant(app: App<Element>) {
  app.use(Tabbar);
  app.use(TabbarItem);
  app.use(Search);
  app.use(Picker);
  app.use(Field);
  app.use(Popover);
  app.use(Popup);
  app.use(Sticky);
}
export function importMinUI(app: App<Element>) {
  app.use(CardPlugin);
  app.use(PopoverPlugin);
  app.use(SearchPlugin);
}