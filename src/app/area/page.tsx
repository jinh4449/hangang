import type { Metadata } from "next";
import { CLINIC, SITE_URL } from "@/content/clinic";
import { PageHead, Section, Cta, MapPanel, JsonLd } from "@/components/site";
import { AreaChips, AREA_COUNT } from "@/components/area";
import { breadcrumb, medicalWebPage } from "@/content/schema";

export const metadata: Metadata = {
  title: "동네별 오시는 길",
  description: `장기동·풍무동·구래동 등 김포시 ${AREA_COUNT}개 동네에서 ${CLINIC.name}까지 걸리는 시간과 오는 방법.`,
  alternates: { canonical: `${SITE_URL}/area` },
};

export default function AreaIndex() {
  return (
    <article className="mx-auto w-full max-w-[58rem] px-[clamp(1.5rem,6vw,7rem)] py-12">
      <JsonLd
        data={medicalWebPage({
          name: `${CLINIC.name} 동네별 오시는 길`,
          path: "/area",
          description: "김포시 동네별로 병원까지 걸리는 시간을 정리했습니다.",
        })}
      />
      <JsonLd data={breadcrumb([{ name: "동네별 안내", path: "/area" }])} />

      <PageHead
        eyebrow="오시는 길"
        title="어느 동네에서 오시나요?"
        lede={`병원은 장기역 3·4번 출구 앞에 있습니다. 김포 어디에서 오셔도 얼마나 걸리는지 적어 두었습니다. 사시는 동네를 눌러 보십시오.`}
      />

      <Section title="동네를 고르십시오">
        <AreaChips />
      </Section>

      <Section title="지도와 길찾기" note="네이버 지도, 카카오맵, 구글 지도 중 쓰시는 앱으로 여실 수 있습니다.">
        <MapPanel />
      </Section>

      <Cta />
    </article>
  );
}
