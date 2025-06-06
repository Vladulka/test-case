import { useContext } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "@components/CustomTooltip/CustomTooltip";
import { colors, defaultData } from "@constants/default-data";
import ThemeContext from "@/providers/ThemeProvider";
import { DataItem, getGraphs } from "@/utils/math";
import CustomLegend from "@components/CustomLegend/CustomLegend";

const LINE_STROKE_WIDTH = 2.5;
const ACTIVE_DOT_RADIUS = 8;

const getLineColor = (key: string): string => {
	return key.endsWith('m') ? 'red' : colors[key];
};

const generateLines = (graphs: DataItem[]) => {
	const { name, ...keys } = graphs[0];
	const relevantKeys = Object.keys(keys);

	return relevantKeys.map(key => {
		const lineStroke = getLineColor(key);
		return (<Line key={key} dataKey={key} stroke={lineStroke} activeDot={{ r: ACTIVE_DOT_RADIUS }} strokeWidth={LINE_STROKE_WIDTH}/>);
	});
};

const CustomGraph = () => {

	const {theme} = useContext(ThemeContext);
	const graphs = getGraphs(defaultData);

	return (
		<LineChart width={600} height={400} data={graphs} style={{background: theme.background}}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" tick={{fill: theme.ticks}} />
			<YAxis tick={{fill: theme.ticks}} />
			<Tooltip content={<CustomTooltip />} />
			<Legend content={<CustomLegend />} />
			{ generateLines(graphs) }
		</LineChart>
	);
};

export default CustomGraph;
