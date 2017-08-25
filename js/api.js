'use strict';
let api=  'e2e66be55b4a3705a80063c2788179a1';
let imageApi = '2a79e4d3-0dab-478d-b9e1-284ffb56d2f2';

let Api = {
	getTMDBkey: () => { return api; },
  getImageApi: () => { return imageApi; }
};

Api.getTMDBkey();
module.exports = Api;
