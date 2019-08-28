import Item from '../src/Components/items/item.js';

const test = QUnit.test;

QUnit.module('Cat Type');

test('renders', assert => {
    const item = {
        id: 4,
        name: 'Stuff',
        incomplete: false
    };

    const expected = /*html*/ `
    
    <li>
        <p class="">
        Stuff
        </p>
    <button class="incomplete-button">incomplete</button>
    <button class="remove-button">🗑️</button>
    </li>
    `;

    const itemType = new Item({ item });
    const html = itemType.renderHTML();

    assert.htmlEqual(html, expected);
});

test('render', assert => {
    const item = {
        id: 5,
        name: 'Things',
        incomplete: true
    };

    const expected = /*html*/`
    
    <li>
    <p class="incomplete">
        Things
    </p>
    <button class="incomplete-button">complete</button>
    <button class="remove-button">🗑️</button>
    </li>
    `;

    const itemType = new Item({ item });
    const html = itemType.renderHTML();

    assert.htmlEqual(html, expected);
});
