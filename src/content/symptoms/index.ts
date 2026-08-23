import type { Symptom } from "../types";
import { backPain } from "./back-pain";
import { carAccident } from "./car-accident";

/** 증상을 추가하려면 파일 하나를 만들어 이 배열에 넣으면 된다. 5개 페이지가 자동 생성된다. */
export const SYMPTOMS: Symptom[] = [backPain, carAccident];

export const getSymptom = (slug: string) => SYMPTOMS.find((s) => s.slug === slug);
