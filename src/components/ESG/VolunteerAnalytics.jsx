/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useMemo } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// const VolunteerAnalytics = ({ analytics }) => {
//   const {
//     totalVolunteers,
//     byCategory,
//     byOrganization,
//     monthlyStats,
//     statusCounts,
//   } = analytics;

//   // 차트 데이터 준비
//   const categoryData = useMemo(
//     () =>
//       Object.entries(byCategory).map(([name, value]) => ({
//         name,
//         value,
//       })),
//     [byCategory]
//   );

//   const monthlyData = useMemo(
//     () =>
//       Object.entries(monthlyStats)
//         .sort()
//         .map(([month, count]) => ({
//           month: month.slice(5), // YYYY-MM에서 MM만 표시
//           참가인원: count,
//         })),
//     [monthlyStats]
//   );

//   const organizationData = useMemo(
//     () =>
//       Object.entries(byOrganization)
//         .sort((a, b) => b[1] - a[1])
//         .slice(0, 10)
//         .map(([name, count]) => ({
//           name,
//           참가인원: count,
//         })),
//     [byOrganization]
//   );

//   return (
//     <Box>
//       {/* 요약 통계 */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} md={3}>
//           <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
//             <Typography variant="h6" color="primary">
//               총 봉사자
//             </Typography>
//             <Typography variant="h4">{totalVolunteers}명</Typography>
//           </Paper>
//         </Grid>
//         {Object.entries(statusCounts).map(([status, count]) => (
//           <Grid item xs={12} md={3} key={status}>
//             <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
//               <Typography variant="h6" color="primary">
//                 {status === "pending"
//                   ? "예정"
//                   : status === "confirmed"
//                   ? "확정"
//                   : "완료"}{" "}
//                 일정
//               </Typography>
//               <Typography variant="h4">{count}건</Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       <Grid container spacing={3}>
//         {/* 월별 통계 */}
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               월별 참가 현황
//             </Typography>
//             <Box sx={{ width: "100%", height: 300 }}>
//               <ResponsiveContainer>
//                 <BarChart data={monthlyData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="참가인원" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* 카테고리별 통계 */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               카테고리별 참가 현황
//             </Typography>
//             <Box sx={{ width: "100%", height: 300 }}>
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={categoryData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                     label
//                   >
//                     {categoryData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* 기관별 상위 10개 */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               기관별 참가 현황 (상위 10개)
//             </Typography>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>기관명</TableCell>
//                     <TableCell align="right">총 참가 인원</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {organizationData.map((row) => (
//                     <TableRow key={row.name}>
//                       <TableCell component="th" scope="row">
//                         {row.name}
//                       </TableCell>
//                       <TableCell align="right">{row.참가인원}명</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default VolunteerAnalytics;

import { useMemo, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const VolunteerAnalytics = ({ analytics, volunteers }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const {
    totalVolunteers,
    byCategory,
    byOrganization,
    monthlyStats,
    statusCounts,
  } = analytics;

  // 월별 선택 옵션 생성
  const monthOptions = useMemo(() => {
    return [...new Set(volunteers.map((v) => v.date.substring(0, 7)))].sort();
  }, [volunteers]);

  // 선택된 월의 일별 데이터 계산
  const dailyData = useMemo(() => {
    const filteredVolunteers = volunteers.filter(
      (v) => v.date.startsWith(selectedMonth) && v.status === "completed"
    );

    const dailyStats = {};
    filteredVolunteers.forEach((v) => {
      const day = v.date;
      if (!dailyStats[day]) {
        dailyStats[day] = {
          date: day,
          totalAttendees: 0,
          organizations: new Set(),
          volunteers: [],
        };
      }
      dailyStats[day].totalAttendees +=
        v.actualAttendees || v.expectedAttendees;
      dailyStats[day].organizations.add(v.organization);
      dailyStats[day].volunteers.push({
        organization: v.organization,
        attendees: v.actualAttendees || v.expectedAttendees,
        activity: v.activity,
        category: v.category,
      });
    });

    return Object.values(dailyStats).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, [volunteers, selectedMonth]);

  // 차트 데이터 준비
  const categoryData = useMemo(
    () => Object.entries(byCategory).map(([name, value]) => ({ name, value })),
    [byCategory]
  );

  const monthlyData = useMemo(
    () =>
      Object.entries(monthlyStats)
        .sort()
        .map(([month, count]) => ({
          month: month.slice(5),
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

        {/* 일별 상세 분석 */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">일별 상세 분석</Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>월 선택</InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  label="월 선택"
                >
                  {monthOptions.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell>총 참가인원</TableCell>
                    <TableCell>참여 단체</TableCell>
                    <TableCell>상세 내역</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dailyData.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell>
                        {new Date(day.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{day.totalAttendees}명</TableCell>
                      <TableCell>
                        {Array.from(day.organizations).join(", ")}
                      </TableCell>
                      <TableCell>
                        <Box component="ul" sx={{ m: 0, pl: 2 }}>
                          {day.volunteers.map((v, idx) => (
                            <li key={idx}>
                              {v.organization} ({v.attendees}명) - {v.activity}{" "}
                              ({v.category})
                            </li>
                          ))}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
