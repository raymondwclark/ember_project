import Route from '@ember/routing/route';
import Ember from 'ember';
import RSVP from 'rsvp';

export default Route.extend({

	model() {
		return RSVP.hash({
			posts: [],
			page: 1
		});
	},

    ajax: Ember.inject.service(),
	actions: {
		openModal: function(modalName, postId, model) {
			// get post and user details
			this.get('ajax').request('https://jsonplaceholder.typicode.com/posts/' + postId, {
				method: 'GET'
			})
			.then(post => {
				this.get('ajax').request('https://jsonplaceholder.typicode.com/users/' + post.userId, {
					method: 'GET'
				})
				.then(user => {
					// set the properties on controller with returned data
					this.controllerFor(modalName).set('post', post)
					this.controllerFor(modalName).set('user', user)
				})
				.catch(err => {
					return err;
				});
			})
			.catch(err => {
				return err;
			});

			// display modal view
			return this.render(modalName, {
				into: 'application',
				outlet: 'modal'
			});
		},

		closeModal: function(modalName) {
			// clear modal contents
			this.controllerFor(modalName).set('post', {})
			this.controllerFor(modalName).set('user', {})

			return this.disconnectOutlet({
				outlet: 'modal',
				parentView: 'application'
			});
		},
	}
});
