'use strict';
let api=  'e2e66be55b4a3705a80063c2788179a1';

let Api = {
	getTMDBkey: () => {
		console.log("key", api);
		return api;
	}
};

Api.getTMDBkey();
module.exports = Api;