import AuthApp from '../app/AuthApp.js';

const app = new AuthApp();
document.body.prepend(app.renderDOM());