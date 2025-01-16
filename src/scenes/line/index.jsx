import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import useLineChartData from "../../hooks/useLineChartData";

const Line = () => {
    const { lineData } = useLineChartData("https://echrily.shop/api/sales/daily"); 
    return ( 
        <Box m="20px">
            <Header title="Line Chart" subtitle="Simple Line Chart" />
            <Box height="75vh" display="flex" width="100%">
                <LineChart data={lineData}/>
            </Box>
        </Box>
    );  
}
export default Line;