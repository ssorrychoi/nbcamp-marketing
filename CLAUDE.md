# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 저장소 개요

KDT 생성형 AI 기반 디지털 마케팅 전문가 양성 과정 5회차 (22주) 학습 기록 저장소.
- GitHub: https://github.com/ssorrychoi/nbcamp-marketing
- Portfolio: https://ssorrychoi.github.io/nbcamp-marketing
- 수료식: 2026년 9월 14일

## 디렉토리 구조

```
TIL/
  template.md          # 매일 TIL 작성 시 복사해서 사용하는 템플릿
  weekXX/YYYY-MM-DD.md # 날짜별 TIL (주차 폴더로 구분)
WIL/
  weekXX.md            # 주간 회고
projects/
  00-onboarding/       # Module 0 | 1주차 산출물
  01-ad-planning/      # Module 2 | 4~5주차 광고 기획 기초 프로젝트
  02-content-creation/ # Module 4 | 8~10주차 마케팅 콘텐츠 심화 프로젝트
  03-data-analysis/    # Module 6 | 12~14주차 마케팅 데이터 분석 프로젝트
  04-final/            # Module 9 | 17~21주차 최종 통합 프로젝트
web/                   # Next.js 포트폴리오 사이트 (TIL/WIL/프로젝트 전시)
```

## 개발 & 배포

**웹 포트폴리오 실행:**

```bash
cd web
npm install
npm run dev           # localhost:3000에서 개발 서버 시작
npm run build         # GitHub Pages 배포용 정적 파일 생성 (out/)
npm run lint          # ESLint 실행
```

**배포:** GitHub Pages에 자동으로 배포되며, basePath는 `/nbcamp-marketing`으로 설정됨

## 웹 포트폴리오 아키텍처

**기술 스택:** Next.js 16 (Static Export), React 19, TypeScript, Tailwind CSS, remark/rehype (마크다운 처리)

**페이지 구조:**
- `src/app/page.tsx` — 메인 페이지
- `src/app/til/page.tsx` — TIL 목록, `src/app/til/[slug]/page.tsx` — TIL 상세보기
- `src/app/wil/page.tsx` — WIL 목록, `src/app/wil/[slug]/page.tsx` — WIL 상세보기
- `src/app/projects/page.tsx` — 프로젝트 목록 (PDF 뷰어 포함)

**콘텐츠 처리:**
- `src/lib/til.ts`, `src/lib/wil.ts`, `src/lib/projects.ts` — 마크다운 파일을 읽고 메타데이터 파싱
- `src/lib/markdown.ts` — remark/rehype를 사용해 마크다운을 HTML로 변환
- TIL/WIL 파일이 추가되면 자동으로 포트폴리오에 반영됨

**테마:** next-themes로 다크모드 지원

## TIL 작성 규칙

- `TIL/template.md`를 복사해서 `TIL/weekXX/YYYY-MM-DD.md`로 저장
- 새 주차가 시작되면 `TIL/weekXX/` 폴더를 새로 만든다
- `README.md`의 `## TIL 목록` 섹션에 링크를 추가한다: `- [YYYY-MM-DD](TIL/weekXX/YYYY-MM-DD.md)`

## 프로젝트 산출물 규칙

- 빈 폴더 유지를 위해 `.gitkeep` 파일이 있음 — 실제 파일 추가 후 삭제해도 무관
- PDF, 이미지, 기획서 등 산출물 파일을 해당 프로젝트 폴더에 직접 추가

## Git 설정

- 사용자: ssorrychoi / djaeseong.choi@gmail.com
- 기본 브랜치: main
