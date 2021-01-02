
export function ApplicantStatusTrans(status = null) {
	const data = {
		1: 'New',
		2: 'REVIEWED',
		3: 'APPOINTMENTED',
		4: 'FAILED',
		5: 'PASSED',
	};

	return status ? data[status] : data;
}