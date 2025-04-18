import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter(),
    paths: {
      base: '/Svelte-Timer', // 👈 important!
    },
    prerender: {
      default: true
    }
  }
};