import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
const data = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 18 },
  { day: "Wed", orders: 10 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 16 },
  { day: "Sat", orders: 25 },
  { day: "Sun", orders: 20 }
];
function OrdersChart() {
    return(
        <div className="card p-3 mt-4 shadow-sm">
            <h5>Weekly Orders</h5>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar
  dataKey="orders"
  fill="#D8B26E"
  radius={[6, 6, 0, 0]}
/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
export default OrdersChart;