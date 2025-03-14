import { MONTHS } from "../constant/columns";


interface ArguInterface {
    month: string;
    totalAmount: number;
}
const populateChartData = (overalRevenuse: ArguInterface[]): number[] => {
    const monthlyData: { [key: string]: number } = {};
    MONTHS?.forEach(month => {
        monthlyData[month] = 0;
    });
    overalRevenuse.forEach(item => {
        const month = item?.month;
        const amount = item?.totalAmount;
        if (month && amount) {
            monthlyData[month] = amount;
        }
    });
    return Object.values(monthlyData);
};
export default populateChartData;
