import Home from './components/Home.vue';
import About from './components/About.vue';
import Movie from './components/Movie.vue';
import Redirect from './components/Redirect.vue';
import Error from './components/404.vue';
import Contact from './components/Contact.vue'

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/movie/:movieName/:id', component: Movie, name: 'movieDetails' },
    { path: '/redirect', component: Redirect, name: 'redirect' },
    { path: '/404', component: Error, name: '404' },
];

export default routes;