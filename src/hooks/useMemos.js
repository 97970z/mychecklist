import { useState, useEffect } from "react";

const useMemos = () => {
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState("");

  // 로컬 스토리지에서 메모 불러오기
  useEffect(() => {
    const storedMemos = localStorage.getItem("memos");
    if (storedMemos) {
      setMemos(JSON.parse(storedMemos));
    }
  }, []);

  // 메모가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  // 새 메모 추가
  const handleAddMemo = () => {
    if (!newMemo.trim()) return;

    const memo = {
      id: Date.now(),
      text: newMemo,
      createdAt: new Date().toISOString(),
    };

    setMemos([memo, ...memos]);
    setNewMemo("");
  };

  // 메모 삭제
  const handleDeleteMemo = (memoId) => {
    setMemos(memos.filter((memo) => memo.id !== memoId));
  };

  return {
    memos,
    newMemo,
    setNewMemo,
    handleAddMemo,
    handleDeleteMemo,
  };
};

export default useMemos;
