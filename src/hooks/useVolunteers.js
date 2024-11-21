// src/hooks/useVolunteers.js
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import {
  DEFAULT_CATEGORIES,
  VOLUNTEER_STATUS,
  createUpdateEntry,
} from "../utils/volunteerConstants";

const useVolunteers = () => {
  // LocalStorage를 사용하여 봉사활동 데이터와 카테고리 저장
  const [volunteers, setVolunteers] = useLocalStorage("volunteers", []);
  const [categories, setCategories] = useLocalStorage(
    "volunteer-categories",
    DEFAULT_CATEGORIES
  );

  // 선택된 필터 상태 관리
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // 봉사활동 추가
  const addVolunteer = (volunteerData) => {
    const newVolunteer = {
      id: Date.now(),
      ...volunteerData,
      status: VOLUNTEER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      actualAttendees: null,
      history: [
        {
          ...createUpdateEntry("created", "새로운 봉사활동이 등록되었습니다."),
        },
      ],
    };
    setVolunteers([...volunteers, newVolunteer]);
  };

  // 봉사활동 상태 업데이트
  const updateVolunteerStatus = (
    volunteerId,
    newStatus,
    actualAttendees = null
  ) => {
    setVolunteers(
      volunteers.map((volunteer) => {
        if (volunteer.id === volunteerId) {
          const statusText =
            newStatus === VOLUNTEER_STATUS.PENDING
              ? "예정으로 변경됨"
              : newStatus === VOLUNTEER_STATUS.CONFIRMED
              ? "확정으로 변경됨"
              : "완료됨";

          // 새로운 업데이트 항목들을 준비
          const updates = [createUpdateEntry("status", statusText)];

          // 완료 상태로 변경되고 실제 참석 인원이 있는 경우 추가 업데이트
          if (
            newStatus === VOLUNTEER_STATUS.COMPLETED &&
            actualAttendees !== null
          ) {
            updates.push(
              createUpdateEntry(
                "attendance",
                `실제 참석 인원: ${actualAttendees}명`
              )
            );
          }

          return {
            ...volunteer,
            status: newStatus,
            actualAttendees:
              newStatus === VOLUNTEER_STATUS.COMPLETED ? actualAttendees : null,
            history: [...volunteer.history, ...updates],
          };
        }
        return volunteer;
      })
    );
  };

  // 봉사활동 정보 업데이트
  const updateVolunteer = (volunteerId, updates) => {
    setVolunteers(
      volunteers.map((volunteer) => {
        if (volunteer.id === volunteerId) {
          // 변경된 필드들을 확인하여 히스토리에 기록
          const changedFields = [];
          for (const [key, value] of Object.entries(updates)) {
            if (volunteer[key] !== value) {
              changedFields.push(key);
            }
          }

          const updateMessage =
            changedFields.length > 0
              ? `다음 정보가 수정됨: ${changedFields.join(", ")}`
              : "정보가 업데이트됨";

          return {
            ...volunteer,
            ...updates,
            history: [
              ...volunteer.history,
              createUpdateEntry("update", updateMessage),
            ],
          };
        }
        return volunteer;
      })
    );
  };

  // 봉사활동 삭제
  const deleteVolunteer = (volunteerId) => {
    setVolunteers(volunteers.filter((v) => v.id !== volunteerId));
  };

  // 새 카테고리 추가
  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // 필터링된 봉사활동 목록 가져오기
  const getFilteredVolunteers = () => {
    return volunteers.filter((volunteer) => {
      const matchesDate = !dateFilter || volunteer.date === dateFilter;
      const matchesCategory =
        !categoryFilter || volunteer.category === categoryFilter;
      const matchesStatus = !statusFilter || volunteer.status === statusFilter;
      return matchesDate && matchesCategory && matchesStatus;
    });
  };

  // 봉사활동 통계 분석
  const getAnalytics = () => {
    const analytics = {
      totalVolunteers: 0,
      byCategory: {},
      byCategoryCount: {}, // 추가: 카테고리별 완료된 일정 수
      byOrganization: {},
      monthlyStats: {},
      yearlyStats: {},
      statusCounts: {
        [VOLUNTEER_STATUS.PENDING]: 0,
        [VOLUNTEER_STATUS.CONFIRMED]: 0,
        [VOLUNTEER_STATUS.COMPLETED]: 0,
      },
    };

    volunteers.forEach((volunteer) => {
      // 상태별 카운트
      analytics.statusCounts[volunteer.status]++;

      // 완료된 봉사활동에 대한 통계
      if (volunteer.status === VOLUNTEER_STATUS.COMPLETED) {
        const actualCount =
          volunteer.actualAttendees || volunteer.expectedAttendees;
        analytics.totalVolunteers += actualCount;

        // 카테고리별 통계
        analytics.byCategory[volunteer.category] =
          (analytics.byCategory[volunteer.category] || 0) + actualCount;

        // 카테고리별 일정 수 카운트
        analytics.byCategoryCount[volunteer.category] =
          (analytics.byCategoryCount[volunteer.category] || 0) + 1;

        // 기관별 통계
        analytics.byOrganization[volunteer.organization] =
          (analytics.byOrganization[volunteer.organization] || 0) + actualCount;

        // 날짜 처리
        const date = new Date(volunteer.date);
        const yearMonth = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        const year = date.getFullYear().toString();

        // 월별 통계
        analytics.monthlyStats[yearMonth] =
          (analytics.monthlyStats[yearMonth] || 0) + actualCount;

        // 연도별 통계
        analytics.yearlyStats[year] =
          (analytics.yearlyStats[year] || 0) + actualCount;
      }
    });

    return analytics;
  };

  return {
    // 상태 및 데이터
    volunteers: getFilteredVolunteers(),
    allVolunteers: volunteers,
    categories,

    // 필터 관련
    dateFilter,
    categoryFilter,
    statusFilter,
    setDateFilter,
    setCategoryFilter,
    setStatusFilter,

    // 액션
    addVolunteer,
    updateVolunteerStatus,
    updateVolunteer,
    deleteVolunteer,
    addCategory,

    // 통계
    getAnalytics,
  };
};

export default useVolunteers;
