import fs from "fs";
import path from "path";

export interface Project {
  id: string;
  title: string;
  module: string;
  period: string;
  description?: string;
  pdfPath?: string;
  imageUrl?: string;
  status: "completed" | "in-progress" | "planned";
}

const PROJECTS: Project[] = [
  {
    id: "00-onboarding",
    title: "온보딩 - 팀 매거진",
    module: "Module 0",
    period: "1주차",
    description: "팀 프로젝트로 제작한 매거진입니다.",
    pdfPath: "/nbcamp-marketing/projects/00-onboarding/magazine.pdf",
    status: "completed",
  },
  {
    id: "01-ad-planning",
    title: "광고 기획 기초 프로젝트",
    module: "Module 2",
    period: "4~5주차",
    description: "광고 기획의 기초를 배우고 실습합니다.",
    status: "in-progress",
  },
  {
    id: "02-content-creation",
    title: "마케팅 콘텐츠 심화 프로젝트",
    module: "Module 4",
    period: "8~10주차",
    description: "효과적인 마케팅 콘텐츠 제작 방법을 배웁니다.",
    status: "planned",
  },
  {
    id: "03-data-analysis",
    title: "마케팅 데이터 분석 프로젝트",
    module: "Module 6",
    period: "12~14주차",
    description: "마케팅 데이터 분석과 인사이트 도출 방법을 배웁니다.",
    status: "planned",
  },
  {
    id: "04-final",
    title: "최종 통합 프로젝트",
    module: "Module 9",
    period: "17~21주차",
    description: "지금까지 배운 모든 내용을 활용한 최종 프로젝트입니다.",
    status: "planned",
  },
];

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function checkPdfExists(project: Project): boolean {
  if (!project.pdfPath) return false;

  // PDF 경로가 정적 자산 경로인 경우, 로컬 public 폴더에서 확인
  // 빌드 시에만 호출되므로 동적으로 체크
  const localPath = path.join(
    process.cwd(),
    "public",
    project.pdfPath.replace("/nbcamp-marketing/", "")
  );

  return fs.existsSync(localPath);
}
