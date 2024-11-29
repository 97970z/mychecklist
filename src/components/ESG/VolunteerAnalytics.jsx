/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Box, Paper, Typography, Grid, useTheme } from "@mui/material";
import {
  Users,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Folder,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CategorySchedule from "./CategorySchedule";

const VolunteerAnalytics = ({ analytics, volunteers }) => {
  const theme = useTheme();
  const {
    totalVolunteers,
    byCategory,
    byCategoryCount,
    byOrganization,
    monthlyStats,
    statusCounts,
  } = analytics;

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  // 카테고리별 데이터 가공
  const categoryData = useMemo(() => {
    return Object.entries(byCategory).map(([name, value]) => ({
      name,
      value,
      count: byCategoryCount[name] || 0,
    }));
  }, [byCategory, byCategoryCount]);

  // 월별 데이터 가공
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

  return (
    <Box sx={{ p: 3 }}>
      {/* 상단 통계 카드 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Users size={24} color={theme.palette.primary.main} />
              <Typography color="text.secondary">총 봉사자</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {totalVolunteers.toLocaleString()}명
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <AlertCircle size={24} color={theme.palette.warning.main} />
              <Typography color="text.secondary">예정 일정</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {statusCounts.pending}건
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Clock size={24} color={theme.palette.info.main} />
              <Typography color="text.secondary">확정 일정</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {statusCounts.confirmed}건
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <CheckCircle size={24} color={theme.palette.success.main} />
              <Typography color="text.secondary">완료 일정</Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {statusCounts.completed}건
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 차트 섹션 */}
      <Grid container spacing={3}>
        {/* 카테고리별 현황 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Folder size={24} color={theme.palette.primary.main} />
              <Typography variant="h6">카테고리별 현황</Typography>
            </Box>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, count, value }) =>
                      `${name} (${count}건, ${value}명)`
                    }
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <Paper sx={{ p: 1.5, boxShadow: 2 }}>
                            <Typography variant="subtitle2">
                              {data.name}
                            </Typography>
                            <Typography variant="body2">
                              일정 수: {data.count}건
                            </Typography>
                            <Typography variant="body2">
                              참가인원: {data.value}명
                            </Typography>
                          </Paper>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 월별 참가 현황 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <TrendingUp size={24} color={theme.palette.primary.main} />
              <Typography variant="h6">월별 참가 현황</Typography>
            </Box>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <Paper sx={{ p: 1.5, boxShadow: 2 }}>
                            <Typography variant="subtitle2">
                              {label}월
                            </Typography>
                            <Typography variant="body2">
                              참가인원: {payload[0].value}명
                            </Typography>
                          </Paper>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="참가인원"
                    fill={theme.palette.primary.main}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 기관별 참여 현황 */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Building2 size={24} color={theme.palette.primary.main} />
                <Typography variant="h6">기관별 참여 현황</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                전체 {Object.keys(byOrganization).length}개 기관
              </Typography>
            </Box>
            <Box
              sx={{
                height: Math.max(400, Object.keys(byOrganization).length * 50),
              }}
            >
              {" "}
              {/* 동적 높이 설정 */}
              <ResponsiveContainer>
                <BarChart
                  layout="vertical"
                  data={Object.entries(byOrganization)
                    .sort((a, b) => b[1] - a[1])
                    .map(([name, value]) => ({
                      name: name.length > 20 ? `${name.slice(0, 20)}...` : name,
                      참가인원: value,
                      fullName: name,
                    }))}
                  margin={{ left: 200 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={180}
                    interval={0} // 모든 라벨 표시
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <Paper sx={{ p: 1.5, boxShadow: 2 }}>
                            <Typography variant="subtitle2">
                              {payload[0].payload.fullName}
                            </Typography>
                            <Typography variant="body2">
                              참가인원: {payload[0].value}명
                            </Typography>
                          </Paper>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="참가인원"
                    fill={theme.palette.primary.main}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <CategorySchedule volunteers={volunteers} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VolunteerAnalytics;
