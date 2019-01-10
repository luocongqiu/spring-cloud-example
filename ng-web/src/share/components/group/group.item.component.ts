import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Group, GroupMenu, GroupItem, GroupMenuEvent} from './group';

@Component({
    selector: 'ai-group-item',
    templateUrl: './group.item.component.html',
    styleUrls: ['group.item.scss']
})
export class GroupItemComponent {
    @Input() group: Group;
    @Input() currentItem: GroupItem;
    @Output() onSelectItem = new EventEmitter();
    @Output() onSelectGroup = new EventEmitter();
    @Output() onSelectGroupMenu = new EventEmitter();
    @Output() onSelectItemMenu = new EventEmitter();
    openGroup = false;

    /**分组展开或收起*/
    toggleGroup(open ?) {
        this.group.opened = !this.group.opened;
        this.openGroup = this.group.opened;
        if (this.openGroup) {
            this.onSelectGroup.emit(this.group);
        }
        if (open) {
            this.openGroup = open;
        }
    }


    _onSelectItem(item) {
        this.onSelectItem.emit(item);
    }

    _onSelectGroup(group) {
        this.onSelectGroup.emit(group);
    }

    // 本节点分组菜单的处理
    _onSelectThisGroupMenu(group: Group, menu: GroupMenu) {
        let menuEvent: GroupMenuEvent = {group: group, menu: menu};
        this.onSelectGroupMenu.emit(menuEvent);
    }

    // 子节点分组菜单的接收和处理
    _onSelectGroupMenu(menuEvent: GroupMenuEvent) {
        this.onSelectGroupMenu.emit(menuEvent);
    }

    // 本节点数据菜单的处理
    _onSelectThisItemMenu(item, menu) {
        let menuEvent = {item: item, menu: menu};
        this.onSelectItemMenu.emit(menuEvent);
    }

    // 子节点数据菜单的处理
    _onSelectItemMenu(menuEvent) {
        this.onSelectItemMenu.emit(menuEvent);
    }

    hasItem(item) {
        if (!this.group.child_items || !this.group.child_items.length) {
            return false;
        }
        let i = 0;
        for (i = 0; i < this.group.child_items.length; i++) {
            if (item === this.group.child_items[i]) {
                return true;
            }
        }
    }
}