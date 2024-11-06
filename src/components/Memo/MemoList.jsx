/* eslint-disable react/prop-types */
import { List } from "@mui/material";
import MemoItem from "./MemoItem";

const MemoList = ({ memos, onMemoDelete }) => {
  return (
    <List>
      {memos.map((memo) => (
        <MemoItem key={memo.id} memo={memo} onDelete={onMemoDelete} />
      ))}
    </List>
  );
};

export default MemoList;
