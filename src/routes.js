import Home from './components/Home.vue';
import About from './components/About.vue';
import Movie from './components/Movie.vue';
import Redirect from './components/Redirect.vue';
import Error from './components/404.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/movie/:movieName/:id', component: Movie, name: 'movieDetails' },
    { path: '/redirect', component: Redirect, name: 'redirect' },
    { path: '/404', component: Error, name: '404' },
];

export default routes;