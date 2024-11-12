// src/components/ESG/ESGPage.jsx
import { useState } from "react";
import { Box, Container, Typography, Tabs, Tab } from "@mui/material";
import VolunteerBoard from "./VolunteerBoard";
import VolunteerForm from "./VolunteerForm";
import VolunteerAnalytics from "./VolunteerAnalytics";
import useVolunteers from "../../hooks/useVolunteers";

const ESGPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    volunteers,
    categories,
    addVolunteer,
    updateVolunteerStatus,
    updateVolunteer,
    deleteVolunteer,
    addCategory,
    getAnalytics,
    dateFilter,
    categoryFilter,
    statusFilter,
    setDateFilter,
    setCategoryFilter,
    setStatusFilter,
  } = useVolunteers();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 4 }}>
        ESG 봉사활동 관리
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="일정 관리" />
        <Tab label="통계 분석" />
      </Tabs>

      {activeTab === 0 ? (
        <Box>
          <VolunteerForm
            categories={categories}
            onSubmit={addVolunteer}
            onAddCategory={addCategory}
          />
          <Box sx={{ mt: 4 }}>
            <VolunteerBoard
              volunteers={volunteers}
              categories={categories}
              onStatusChange={updateVolunteerStatus}
              onUpdate={updateVolunteer}
              onDelete={deleteVolunteer}
              dateFilter={dateFilter}
              categoryFilter={categoryFilter}
              statusFilter={statusFilter}
              onDateFilterChange={setDateFilter}
              onCategoryFilterChange={setCategoryFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </Box>
        </Box>
      ) : (
        <VolunteerAnalytics analytics={getAnalytics()} />
      )}
    </Container>
  );
};

export default ESGPage;
