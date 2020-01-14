import Home from './components/Home.vue';
import About from './components/About.vue';
import Movie from './components/Movie.vue';
import Redirect from './components/Redirect.vue';
import Error from './components/404.vue';
import Contact from './components/Contact.vue';
import Slider1 from './components/Slider1.vue';
import Slider2 from './components/Slider2.vue';

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/slider1', component: Slider1, },
    { path: '/slider2', component: Slider2, },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/movie/:movieName/:id', component: Movie, name: 'movieDetails' },
    { path: '/redirect', component: Redirect, name: 'redirect' },
    { path: '/404', component: Error, name: '404' },
];

export default routes;