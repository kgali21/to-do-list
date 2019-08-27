import Component from '../types/Component.js';
import Header from '../header.js';
import ItemForm from '../items/itemForm.js';
import ItemList from '../items/itemList.js';
import { getItems, addItem, updateItem, removeItem } from '../../services/list-api.js';

class ItemTypesApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const itemForm = new ItemForm({
            onAdd: item => {

                return addItem(item)
                    .then(saved => {

                        const items = this.state.items;
                        items.push(saved);
                        ItemList.update({ items });
                    });
            }
        });
        main.appendChild(itemForm.renderDOM());

        const itemList = new ItemList({
            items: [],
            onUpdate: item => {

                return updateItem(item)
                    .then(update => {
                        const items = this.stat.items;

                        const index = items.indexOf(items);
                        items.splice(index, 1, update);

                        itemList.update({ items });
                    });
            },
            onRemove: item => {
                return removeItem(item.id)
                    .then(() => {
                        const items = this.state.items;

                        const index = items.indexOf(item);
                        items.spline(index, 1);

                        itemList.update({ items });
                    });
            }
        });
        main.appendChild(itemList.renderDOM());

        getItems({ showAl: true })
            .then(items => {
                this.state.items = items;
                itemList.update({ items });
            })
            .catch(err => {
                console.log(err);
            });

    }

    renderHTML() {
        return /*html*/ `
        <div>
            <main>
            </main>
        </div>
        `;
    }
}

export default ItemTypesApp;