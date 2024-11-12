// src/constants/volunteerConstants.js
export const VOLUNTEER_STATUS = {
  PENDING: "pending", // 예정
  CONFIRMED: "confirmed", // 확정
  COMPLETED: "completed", // 완료
};

export const UPDATE_TYPES = {
  CREATED: "created", // 생성
  STATUS: "status", // 상태 변경
  UPDATE: "update", // 정보 업데이트
  ATTENDANCE: "attendance", // 참석 인원 기록
};

export const DEFAULT_CATEGORIES = ["ESG", "버드나무"];

export const createUpdateEntry = (type, content) => ({
  timestamp: new Date().toISOString(),
  type,
  content,
});
