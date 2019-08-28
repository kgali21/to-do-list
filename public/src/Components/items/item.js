import Component from '../types/Component.js';

class Item extends Component {

    onRender(dom) {
        const item = this.props.item;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const incompleteButton = dom.querySelector('.incomplete-button');
        incompleteButton.addEventListener('click', () => {
            item.incomplete = !item.incomplete;
            onUpdate(item);
        });

        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            if(confirm(`Are you sure you want to remove "${item.name}"?`)) {
                onRemove(item);
            }
        });
    }

    renderHTML() {
        const item = this.props.item;

        return /*html*/ `
            <div>
                <li>
                    <p class="${item.incomplete ? 'incomplete' : ''}">
                        ${item.name}
                    </p>
                    <button class="incomplete-button">${item.incomplete ? 'complete' : 'incomplete'}</button>
                    <button class="remove-button">🗑️</button>
                </li>
            </div>
        `;
    }
}

export default Item;