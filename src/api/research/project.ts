import request from '/@/utils/request';

export function listProjectInfo(query: any) {
	return request({
		url: '/ProjectInfo/list',
		method: 'get',
		params: query,
	});
}

export function addProjectInfo(data: any) {
	return request({
		url: '/ProjectInfo/add',
		method: 'post',
		data,
	});
}

export function updateProjectInfo(data: any) {
	return request({
		url: '/ProjectInfo/update',
		method: 'post',
		data,
	});
}

export function deleteProjectInfo(ids: number[]) {
	return request({
		url: '/ProjectInfo/delete',
		method: 'post',
		data: ids,
	});
}
