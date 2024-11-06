/* eslint-disable react/prop-types */
import { Box, Container } from "@mui/material";
import Header from "./Header";
import SideMenu from "./SideMenu";

const Layout = ({
  children,
  isDrawerOpen,
  onDrawerToggle,
  memos,
  newMemo,
  onNewMemoChange,
  onMemoAdd,
  onMemoDelete,
}) => {
  return (
    <Box>
      <Header onMenuClick={onDrawerToggle} />
      <SideMenu
        isOpen={isDrawerOpen}
        onClose={onDrawerToggle}
        memos={memos}
        newMemo={newMemo}
        onNewMemoChange={onNewMemoChange}
        onMemoAdd={onMemoAdd}
        onMemoDelete={onMemoDelete}
      />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
