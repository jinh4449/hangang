import type { DepartmentKey, Symptom } from "../types";
import { pain } from "./pain";
import { sportsInjury } from "./sports-injury";
import { carAccident } from "./car-accident";
import { diet } from "./diet";
import { indigestion } from "./indigestion";
import { fatigue } from "./fatigue";
export { DEPARTMENTS } from "./departments";

/** 진료과목을 추가하려면 파일 하나를 만들어 이 배열에 넣으면 된다. 4개 페이지가 자동 생성된다.
    묶음(department)이 같은 과목끼리 붙여 둔다. 메뉴와 목록이 이 순서를 따른다 */
export const SYMPTOMS: Symptom[] = [pain, sportsInjury, carAccident, diet, indigestion, fatigue];

export const getSymptom = (slug: string) => SYMPTOMS.find((s) => s.slug === slug);

/** 한 진료과목 묶음에 드는 과목들 */
export const symptomsIn = (key: DepartmentKey) => SYMPTOMS.filter((s) => s.department === key);
