import { Tabbar, TabbarItem, Search, Picker, Field } from "vant";
export function importVant(app:any) {
    app.use(Tabbar);
    app.use(TabbarItem);
    app.use(Search);
    app.use(Picker);
    app.use(Field);
}

