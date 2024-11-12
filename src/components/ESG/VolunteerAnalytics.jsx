/* eslint-disable react/prop-types */
import { useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const VolunteerAnalytics = ({ analytics }) => {
  const {
    totalVolunteers,
    byCategory,
    byOrganization,
    monthlyStats,
    statusCounts,
  } = analytics;

  // 차트 데이터 준비
  const categoryData = useMemo(
    () =>
      Object.entries(byCategory).map(([name, value]) => ({
        name,
        value,
      })),
    [byCategory]
  );

  const monthlyData = useMemo(
    () =>
      Object.entries(monthlyStats)
        .sort()
        .map(([month, count]) => ({
          month: month.slice(5), // YYYY-MM에서 MM만 표시
          참가인원: count,
        })),
    [monthlyStats]
  );

  const organizationData = useMemo(
    () =>
      Object.entries(byOrganization)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, count]) => ({
          name,
          참가인원: count,
        })),
    [byOrganization]
  );

  return (
    <Box>
      {/* 요약 통계 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" color="primary">
              총 봉사자
            </Typography>
            <Typography variant="h4">{totalVolunteers}명</Typography>
          </Paper>
        </Grid>
        {Object.entries(statusCounts).map(([status, count]) => (
          <Grid item xs={12} md={3} key={status}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" color="primary">
                {status === "pending"
                  ? "예정"
                  : status === "confirmed"
                  ? "확정"
                  : "완료"}{" "}
                일정
              </Typography>
              <Typography variant="h4">{count}건</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* 월별 통계 */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              월별 참가 현황
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="참가인원" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 카테고리별 통계 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              카테고리별 참가 현황
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 기관별 상위 10개 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              기관별 참가 현황 (상위 10개)
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>기관명</TableCell>
                    <TableCell align="right">총 참가 인원</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {organizationData.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.참가인원}명</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolunteerAnalytics;
