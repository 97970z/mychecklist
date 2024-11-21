import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  LinearProgress,
  Chip,
  useTheme,
} from "@mui/material";
import {
  Database,
  HardDrive,
  AlertTriangle,
  Play,
  Pause,
  Trash2,
  Archive,
  Activity,
} from "lucide-react";

const StorageMonitor = () => {
  const theme = useTheme();
  const [usage, setUsage] = useState({
    total: 0,
    byKey: [],
  });
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  const calculateUsage = () => {
    let total = 0;
    const byKey = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const size = new Blob([value]).size;
      total += size;
      byKey.push({
        key,
        size,
        sizeInKB: (size / 1024).toFixed(2),
        value: value.slice(0, 50),
      });
    }

    return {
      total,
      totalInKB: (total / 1024).toFixed(2),
      totalInMB: (total / (1024 * 1024)).toFixed(2),
      byKey: byKey.sort((a, b) => b.size - a.size),
      usagePercentage: (total / (5 * 1024 * 1024)) * 100,
    };
  };

  useEffect(() => {
    const updateUsage = () => {
      setUsage(calculateUsage());
    };

    updateUsage();
    let interval;

    if (isAutoRefresh) {
      interval = setInterval(updateUsage, 3000);
    }

    window.addEventListener("storage", updateUsage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", updateUsage);
    };
  }, [isAutoRefresh]);

  const getProgressColor = (percentage) => {
    if (percentage > 80) return theme.palette.error.main;
    if (percentage > 60) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getChipColor = (percentage) => {
    if (percentage > 20) return "error";
    if (percentage > 10) return "warning";
    return "success";
  };

  return (
    <Box sx={{ p: 4, bgcolor: "background.default" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Database size={28} color={theme.palette.primary.main} />
          <Typography variant="h5" fontWeight="bold">
            Storage Monitor
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            icon={<Activity size={16} />}
            label={isAutoRefresh ? "Live Monitoring" : "Monitoring Paused"}
            color={isAutoRefresh ? "success" : "default"}
            variant="outlined"
            sx={{ animation: isAutoRefresh ? "pulse 2s infinite" : "none" }}
          />
          <Tooltip
            title={isAutoRefresh ? "Pause Monitoring" : "Resume Monitoring"}
          >
            <IconButton
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              color={isAutoRefresh ? "primary" : "default"}
            >
              {isAutoRefresh ? <Pause size={20} /> : <Play size={20} />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Storage Overview Card */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              background: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <HardDrive size={20} color={theme.palette.primary.main} />
              <Typography variant="h6">Storage Overview</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Used Space
                </Typography>
                <Typography
                  variant="body2"
                  color={getProgressColor(usage.usagePercentage)}
                  fontWeight="medium"
                >
                  {usage.totalInMB}MB / 5MB
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(usage.usagePercentage, 100)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "grey.100",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: getProgressColor(usage.usagePercentage),
                    borderRadius: 4,
                  },
                }}
              />
            </Box>

            {usage.usagePercentage > 80 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "error.main",
                  bgcolor: "error.lighter",
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <AlertTriangle size={20} />
                <Typography variant="body2">
                  Storage usage is critically high!
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Quick Stats Card */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              background: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Quick Stats
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: theme.palette.primary.lighter,
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Archive size={24} color={theme.palette.primary.main} />
                  <Typography variant="h4" color="primary.main" sx={{ mt: 1 }}>
                    {usage.byKey.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Items
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: theme.palette.success.lighter,
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <HardDrive size={24} color={theme.palette.success.main} />
                  <Typography variant="h4" color="success.main" sx={{ mt: 1 }}>
                    {(usage.total / (usage.byKey.length || 1) / 1024).toFixed(
                      1
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Size (KB)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Storage Details Table */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              background: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Storage Details
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Usage</TableCell>
                    <TableCell>Preview</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usage.byKey.map((item) => (
                    <TableRow
                      key={item.key}
                      sx={{ "&:hover": { bgcolor: "action.hover" } }}
                    >
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography noWrap title={item.key}>
                          {item.key}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{item.sizeInKB}KB</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${((item.size / usage.total) * 100).toFixed(
                            1
                          )}%`}
                          color={getChipColor((item.size / usage.total) * 100)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography
                          variant="body2"
                          noWrap
                          title={item.value}
                          color="text.secondary"
                        >
                          {item.value}...
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Delete Item">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              localStorage.removeItem(item.key);
                              setUsage(calculateUsage());
                            }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
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

export default StorageMonitor;
