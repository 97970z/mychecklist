/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Collapse,
  IconButton,
  useTheme,
} from "@mui/material";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";

const CategorySchedule = ({ volunteers }) => {
  const theme = useTheme();
  const [expandedMonth, setExpandedMonth] = React.useState(null);

  const scheduleData = useMemo(() => {
    // 카테고리별 월별 일정 집계
    const scheduleByMonth = {};
    const categories = new Set();

    volunteers.forEach((volunteer) => {
      const monthKey = volunteer.date.substring(0, 7);
      if (!scheduleByMonth[monthKey]) {
        scheduleByMonth[monthKey] = {};
      }

      categories.add(volunteer.category);

      if (!scheduleByMonth[monthKey][volunteer.category]) {
        scheduleByMonth[monthKey][volunteer.category] = new Set();
      }

      scheduleByMonth[monthKey][volunteer.category].add(volunteer.date);
    });

    // 정렬된 결과 반환
    return {
      months: Object.keys(scheduleByMonth).sort((a, b) => b.localeCompare(a)),
      categories: Array.from(categories).sort(),
      scheduleByMonth: scheduleByMonth,
    };
  }, [volunteers]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Calendar size={24} color={theme.palette.primary.main} />
          <Typography variant="h6">카테고리별 일정 현황</Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>월</TableCell>
                {scheduleData.categories.map((category) => (
                  <TableCell key={category}>{category}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduleData.months.map((month) => {
                const isExpanded = expandedMonth === month;
                return (
                  <React.Fragment key={month}>
                    <TableRow
                      hover
                      onClick={() =>
                        setExpandedMonth(isExpanded ? null : month)
                      }
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <IconButton size="small">
                            {isExpanded ? (
                              <ChevronDown size={20} />
                            ) : (
                              <ChevronRight size={20} />
                            )}
                          </IconButton>
                          {month}
                        </Box>
                      </TableCell>
                      {scheduleData.categories.map((category) => {
                        const dates =
                          scheduleData.scheduleByMonth[month][category];
                        return (
                          <TableCell key={category}>
                            {dates ? (
                              <Chip
                                label={`${dates.size}일`}
                                color="primary"
                                variant={isExpanded ? "filled" : "outlined"}
                                size="small"
                              />
                            ) : (
                              "-"
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={scheduleData.categories.length + 1}
                        sx={{ py: 0 }}
                      >
                        <Collapse in={isExpanded}>
                          <Box sx={{ py: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                              상세 일정:
                            </Typography>
                            <Box
                              sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
                            >
                              {scheduleData.categories.map((category) => {
                                const dates =
                                  scheduleData.scheduleByMonth[month][category];
                                if (!dates || dates.size === 0) return null;

                                return (
                                  <Box
                                    key={category}
                                    sx={{ flex: 1, minWidth: 200 }}
                                  >
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ mb: 1 }}
                                    >
                                      {category}:
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        gap: 1,
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      {Array.from(dates)
                                        .sort()
                                        .map((date) => (
                                          <Chip
                                            key={date}
                                            label={formatDate(date)}
                                            size="small"
                                            sx={{ mb: 1 }}
                                          />
                                        ))}
                                    </Box>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CategorySchedule;
