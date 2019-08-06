import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
	page: 1,
	limit: 10,
	max: 0,
	ajax: Ember.inject.service(),

	// TODO: can use url params so when user refreshes or navigates the list doesn't start from page 1

	init() {
		this._super();
		this.getPosts(1);

		// get initial count (TODO: optimize)
		this.get('ajax').request('https://jsonplaceholder.typicode.com/posts', {
			method: 'GET'
		})
		.then(response => {
			this.max = response.length;
		})
		.catch(err => {
			console.log('Error', err);
		});
	},

	getPosts(page) {
		this.get('ajax').request('https://jsonplaceholder.typicode.com/posts?_page=' + page + '&_limit=' + this.limit, {
			method: 'GET'
		})
		.then(response => {
			this.set('model.posts', response);
		})
		.catch(err => {
			console.log('Error', err);
		});
	},

	actions: {
		// pagination controls
		first: function() {
			this.page = 1;
			this.set('model.page', this.page);
			this.getPosts(this.page);
		},

		previous: function() {
			if(this.page > 1) {
				this.page--;
				this.set('model.page', this.page);
				this.getPosts(this.page);
			}
		},

		next: function() {
			if(this.page < (this.max - this.limit) / this.limit) {
				this.page++;
				this.set('model.page', this.page);
				this.getPosts(this.page);
			}
		},

		last: function() {
			this.page = (this.max - this.limit) / this.limit;
			this.set('model.page', this.page);
			this.getPosts(this.page);
		}
	},
});
