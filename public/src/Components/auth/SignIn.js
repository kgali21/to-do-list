import Component from '../types/Component.js';

class SignIn extends Component {

    onRender(form) {
        const onSignIn = this.props.onSignIn;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const credentials = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            onSignIn(credentials);
        });
    }

    renderHTML() {
        return /*html*/`
        <form class="auth-form">
        <p>
            <label for="sign-in">Email</label>
            <input id="sign-in" type="email" name="email" required placeholder="username@email.com">
        </p>

        <p>
            <label for="sign-in-pass">Password</label>
            <input id="sign-in-pass" type="password" name="password" required placeholder="******">
        </p>

        <p>
            <button>Sign In</button>
        </p>
    </form>
        `;
    }
}

export default SignIn;