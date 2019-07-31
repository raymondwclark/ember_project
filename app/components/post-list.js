import Component from '@ember/component';
import Ember from 'ember';
import { A } from '@ember/array';

export default Component.extend({
	posts: A(),
	ajax: Ember.inject.service(),

	init() {
		this._super();
		this.getPosts();
	},

	// initial request for posts
	getPosts() {
		return this.get('ajax').request('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10', {
			method: 'GET'
		})
		.then(response => {
			this.set('posts', response);
			console.log(response)
		})
		.catch(err => {
			console.log('Error', err);
		});
	}
});