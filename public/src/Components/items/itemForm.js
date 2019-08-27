import Component from '../types/Component.js';

class ItemForm extends Component {
    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=type]');
        const error = dom.querySelector('p.error');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const itemStuff = {
                name: input.value
            };

            error.textContent = '';

            onAdd(itemStuff)
                .then(() => {
                    form.reset();
                    document.activeElement.blur();
                })
                .catch(err => {
                    error.textContent = err;
                });
        });
    }

    renderHTML() {
        return /*html*/`
        <section class="item-form-section">
            <form class="item-form">
                <input type="input" required>
                <button>ADD</button>
            </form>
            <p class="error"></p>
        </section>
        `;
    }
}

export default ItemForm; 