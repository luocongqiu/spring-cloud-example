import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Group, GroupItem, GroupMenuEvent} from './group';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ai-group',
    templateUrl: './group.component.html',
    styleUrls: ['group.scss']
})
export class GroupComponent {
    @Input() groupList: Group[];
    @Input() currentItem: GroupItem;
    @Output() onSelectItem = new EventEmitter();
    @Output() onSelectGroup = new EventEmitter();
    @Output() onSelectGroupMenu = new EventEmitter();
    @Output() onSelectItemMenu = new EventEmitter();

    constructor(private dropdownConfig: NgbDropdownConfig) {
        // dropdownConfig.autoClose = true;
    }

    _onSelectItem(item) {
        this.onSelectItem.emit(item);
    }

    _onSelectGroup(group) {
        this.onSelectGroup.emit(group);
    }

    _onSelectGroupMenu(menuEvent: GroupMenuEvent) {
        this.onSelectGroupMenu.emit(menuEvent);
    }

    _onSelectItemMenu(menuEvent: GroupMenuEvent) {
        this.onSelectItemMenu.emit(menuEvent);
    }
}