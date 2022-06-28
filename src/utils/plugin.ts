import { Tabbar, TabbarItem, Search, Picker } from "vant";
export function importVant(app:any) {
    app.use(Tabbar);
    app.use(TabbarItem);
    app.use(Search);
    app.use(Picker);
}

