import type { DepartmentKey } from "../types";

/**
 * 진료과목 묶음.
 *
 * 통증치료 — 급·만성 통증, 스포츠 손상, 교통사고 후유증. 재활 치료를 하지 않으므로
 *            「재활」 이 아니라 통증치료로 묶는다.
 * 다이어트 — 따로 선다.
 * 한방내과 — 소화불량, 만성피로. 앞으로 내과 질환 과목이 늘어나는 자리다.
 */
export const DEPARTMENTS: { key: DepartmentKey; name: string; line: string }[] = [
  { key: "pain", name: "통증치료", line: "갑자기 아픈 통증부터 오래된 통증, 운동 중 손상, 교통사고 후유증까지." },
  { key: "diet", name: "다이어트", line: "체질과 생활에 맞춘 한약과 관리로 감량을 돕습니다." },
  { key: "internal", name: "한방내과", line: "검사는 정상인데 불편한 소화·피로 같은 몸속 문제를 봅니다." },
];
