import type { Symptom } from "../types";
import { pain } from "./pain";
import { carAccident } from "./car-accident";
import { diet } from "./diet";
import { indigestion } from "./indigestion";
import { fatigue } from "./fatigue";

/** 진료과목을 추가하려면 파일 하나를 만들어 이 배열에 넣으면 된다. 4개 페이지가 자동 생성된다. */
export const SYMPTOMS: Symptom[] = [pain, carAccident, diet, indigestion, fatigue];

export const getSymptom = (slug: string) => SYMPTOMS.find((s) => s.slug === slug);
