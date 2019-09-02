import Component from './types/Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title;

        return /*html*/`
            <header>
                <h1>${title}</h1>
                <nav>
                <a href="./index.html">| List Page</a>
                <a href="./auth.html">| Log In/Create Account |</a>
                </nav>
            </header>
            `;
    }
}

export default Header;