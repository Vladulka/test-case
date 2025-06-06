import styles from './CustomTooltip.module.css';
import type { TooltipProps} from 'recharts';
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
	if (!payload) return null;

	const tooltip = payload.filter(item => item.color !== 'red');

	if ( active && payload && payload.length ) {
		return (
			<div className={styles.tooltipBody}>
				<p>{label}</p>
				{
					tooltip.map(item => <p key={item.dataKey} style={{ color: item.color }}>{item.dataKey}: {item.value}</p>)
				}
			</div>
		);
	}
}

export default CustomTooltip;
