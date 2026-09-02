import type { Metadata } from "next";
import { CLINIC } from "@/content/clinic";
import { PageHead, Section, Bezel, Cta, MapPanel, JsonLd } from "@/components/site";
import { AreaChips } from "@/components/area";
import { ParkingList } from "@/components/parking";
import { webPage, breadcrumb } from "@/content/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/directions" },
  title: "오시는 길 — 장기역 3·4번 출구 도보 1분, 주차 3곳",
  description:
    "김포한강한의원 오시는 길. 김포골드라인 장기역 3·4번 출구 도보 1분, 다이소 맞은편 일신프라자 202호. 주차는 건물 옥상과 장기1·2공영주차장 세 곳. 김포 16개 동네에서 걸리는 시간도 정리했습니다.",
};

export default function Directions() {
  return (
    <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
      <JsonLd
        data={webPage({
          name: `${CLINIC.name} 오시는 길`,
          description: `${CLINIC.transit}. ${CLINIC.address}.`,
          path: "/directions",
        })}
      />
      <JsonLd data={breadcrumb([{ name: "오시는 길", path: "/directions" }])} />
      <PageHead
        eyebrow="오시는 길"
        title="장기역 3·4번 출구 도보 1분"
        lede={`${CLINIC.address}. ${CLINIC.landmark}에 있습니다. 주차 공간은 세 곳을 이용하실 수 있습니다.`}
      />

      <Section title="지하철">
        <Bezel>
          <div className="p-7">
            <p className="kr text-[15px] leading-8">
              김포골드라인 <strong className="font-semibold">장기역 3번 또는 4번 출구</strong>에서 도보 1분입니다.
              출구를 나오시면 {CLINIC.landmark} 건물 2층 202호입니다.
            </p>
          </div>
        </Bezel>
      </Section>

      <Section title="주차" note="세 곳 중 편하신 곳을 이용하시면 됩니다. 주소를 누르시면 복사됩니다.">
        <ParkingList />
      </Section>

      <Section title="어느 동네에서 오시나요?">
        <AreaChips />
      </Section>

      {/* TODO: 도메인 확정 후 네이버 지도 JS API 로 네이버 지도도 삽입 (Client ID 발급 시 도메인 등록 필요) */}
      <Section title="지도와 길찾기" note="네이버 지도, 카카오맵, 구글 지도 중 쓰시는 앱으로 여실 수 있습니다.">
        <MapPanel />
      </Section>

      <Cta />
    </article>
  );
}
