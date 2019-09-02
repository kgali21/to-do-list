import Component from '../types/Component.js';
import Item from './item.js';

class ItemList extends Component {
    onRender(list){
        const items = this.props.items;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        items.forEach(item => {
            const itemType = new Item({ item, onUpdate, onRemove });
            list.appendChild(itemType.renderDOM());
        });
    }
    renderHTML() {
        return /*html*/ `
            <ul></ul>
        `;
    }
}

export default ItemList;