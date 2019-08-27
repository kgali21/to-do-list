import Component from './types/Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title;

        return /*html*/`
            <header>
                <h1>${title}</h1>
            </header>
            `;
    }
}

export default Header;