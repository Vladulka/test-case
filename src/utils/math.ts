export interface DataItem {
	name: string;
	[key: string]: any;
}

export const getGraphs = (data: DataItem[]) => {
	const baseResult = data.map(item => ({ name: item.name }));
	const keys = Object.keys(data[0]).filter(key => key !== 'name');

	keys.forEach(key => {
		const values = data.map(item => item[key]);
		const average = getAverage(values);
		const deviation = getDeviation(values, average);

		baseResult.forEach((item: DataItem, index: number) => {
			const zScore = getZScore(data[index][key], deviation, average);
			const zScorePrev = index > 0 ? getZScore(data[index - 1][key], deviation, average) : 0;
			const zScoreNext = index < data.length - 1 ? getZScore(data[index + 1][key], deviation, average) : 0;

			item[key] = data[index][key];

			if (zScore > 1 || zScorePrev > 1) {
				if (index === 0 || (index < data.length - 1 && zScoreNext > 1)) {
					item[key + 'm'] = data[index][key];
				} else {
					item[key] = data[index][key];
					item[key + 'm'] = data[index][key];
				}
			}
		});
	});
	return baseResult;
}

export const getAverage = (array: number[]) => {
	return array.reduce((sum, curr) => sum + curr, 0) / array.length;
}

export const getDeviation = (array: number[], average: number) => {
	const sum = array.reduce((sum, curr) => {
		return sum + ((curr - average) ** 2)
	}, 0);
	return Math.sqrt(sum / array.length);
}

export const getZScore = (current: number, deviation: number, average: number) => {
	return (current - average) / deviation;
}
