import styles from './CustomLegend.module.css';
import type { LegendProps } from 'recharts';

const CustomLegend = ({ payload }: LegendProps) => {
	if (!payload) return null;

	const legend = payload.filter(item => item.color !== 'red');

	return (
		<div className={styles.legend}>
			{
				legend.map((item, index: number) => (
					<div key={index} className={styles.legendItem} style={{ color: item.color }}>
						<div className={styles.pin} style={{ backgroundColor: item.color }} />
						{item.value}
					</div>
				))
			}
		</div>
	);
};

export default CustomLegend;
