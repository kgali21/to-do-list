import Component from './types/Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title;

        return /*html*/`
            <header>
                <h1>TO DO LIST</h1>
            </header>
            `;
    }
}

export default Header;