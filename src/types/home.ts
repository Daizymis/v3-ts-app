export interface tabBar {
    id: number;
    title:string;
    name:string;
}

export class homeData {
    tabBarList?: tabBar[];
    activeTab?:string;
}