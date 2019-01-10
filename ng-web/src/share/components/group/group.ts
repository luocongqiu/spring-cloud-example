export class Group {
    group_id: number;
    parent_id: number;
    group_name: string;
    group_icon: string;
    order: number;
    child_groups: Group[];
    child_items: GroupItem[];
    group_menus: GroupMenu[];
    opened: boolean;
}
export class GroupItem {
    item_id: number;
    group_id: number;
    item_name: string;
    item_icon: string;
    item_menus: GroupMenu[];
    item_obj: any; // 源对象可以存储在这里便于存取
}
export class GroupMenu {
    menu_id: string;
    // group_id: number;
    menu_name: string;
    menu_icon: string;
}
export class GroupMenuEvent {
    menu: GroupMenu;
    group: Group;
}