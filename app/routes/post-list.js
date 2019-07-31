import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({

	model() {
		return this.get('ajax').request('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10', {
			method: 'GET'
		})
		.then(response => {
			return response;
		})
		.catch(err => {
			return err;
		});
	},

	ajax: Ember.inject.service(),
	actions: {
		openModal: function(modalName, model) {
			this.controllerFor(modalName).set('model', model)
			return this.render(modalName, {
				into: 'application',
				outlet: 'modal'
			});
		},
		closeModal: function() {
			return this.disconnectOutlet({
				outlet: 'modal',
				parentView: 'application'
			});
		}
	},

	init() {
		this._super();
	},

	// initial request for posts
	// getPosts() {
	// 	// console.log(this.posts)
	// 	return this.get('ajax').request('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10', {
	// 		method: 'GET'
	// 	})
	// 	.then(response => {
	// 		this.set('posts', response);
	// 		return response;
	// 	})
	// 	.catch(err => {
	// 		console.log('Error', err);
	// 	});
	// }
});
