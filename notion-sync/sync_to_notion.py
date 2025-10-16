"""
Am I Real Sia - Notion 자동 동기화 스크립트
프로젝트 정보를 자동으로 읽어서 Notion에 기록합니다.
"""

import os
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any

from notion_client import Client
from dotenv import load_dotenv
import git

# 환경변수 로드
load_dotenv()

class NotionProjectSync:
    def __init__(self):
        self.notion = Client(auth=os.getenv("NOTION_API_KEY"))
        self.database_id = os.getenv("NOTION_DATABASE_ID")
        self.project_path = Path(os.getenv("PROJECT_PATH", "."))
        self.project_name = os.getenv("PROJECT_NAME", "Am I Real Sia")

    def read_readme(self) -> Dict[str, Any]:
        """README.md 파일을 읽어서 프로젝트 정보 추출"""
        readme_path = self.project_path / "README.md"

        if not readme_path.exists():
            return {}

        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 프로젝트 정보 추출
        info = {
            "title": self.project_name,
            "content": content,
            "last_updated": datetime.now().isoformat(),
            "word_count": len(content.split()),
            "sections": self._extract_sections(content)
        }

        return info

    def _extract_sections(self, content: str) -> List[str]:
        """마크다운 섹션 헤더 추출"""
        sections = []
        for line in content.split('\n'):
            if line.startswith('## '):
                sections.append(line.replace('## ', '').strip())
        return sections

    def get_git_info(self) -> Dict[str, Any]:
        """Git 저장소 정보 수집"""
        try:
            repo = git.Repo(self.project_path)

            # 최근 커밋 정보
            commits = list(repo.iter_commits('HEAD', max_count=10))
            commit_list = []

            for commit in commits:
                commit_list.append({
                    "hash": commit.hexsha[:7],
                    "message": commit.message.strip(),
                    "author": str(commit.author),
                    "date": commit.committed_datetime.isoformat()
                })

            return {
                "branch": repo.active_branch.name,
                "commits": commit_list,
                "total_commits": len(list(repo.iter_commits()))
            }
        except Exception as e:
            print(f"Git 정보 수집 실패: {e}")
            return {}

    def scan_project_files(self) -> Dict[str, Any]:
        """프로젝트 파일 구조 스캔"""
        file_info = {
            "total_files": 0,
            "file_types": {},
            "directories": []
        }

        # 제외할 디렉토리
        exclude_dirs = {'.git', 'node_modules', '__pycache__', '.venv', 'venv'}

        for root, dirs, files in os.walk(self.project_path):
            # 제외 디렉토리 필터링
            dirs[:] = [d for d in dirs if d not in exclude_dirs]

            # 상대 경로 계산
            rel_path = Path(root).relative_to(self.project_path)
            if str(rel_path) != '.':
                file_info["directories"].append(str(rel_path))

            for file in files:
                file_info["total_files"] += 1
                ext = Path(file).suffix or 'no_extension'
                file_info["file_types"][ext] = file_info["file_types"].get(ext, 0) + 1

        return file_info

    def create_notion_page(self, data: Dict[str, Any]) -> str:
        """Notion 페이지 생성"""
        try:
            # README 정보
            readme_info = data.get("readme", {})
            git_info = data.get("git", {})
            file_info = data.get("files", {})

            # 페이지 속성 구성
            properties = {
                "Name": {
                    "title": [
                        {
                            "text": {
                                "content": f"{self.project_name} - {datetime.now().strftime('%Y-%m-%d')}"
                            }
                        }
                    ]
                },
                "Status": {
                    "select": {
                        "name": "In Progress"
                    }
                },
                "Last Updated": {
                    "date": {
                        "start": datetime.now().isoformat()
                    }
                }
            }

            # 페이지 내용 구성
            children = [
                {
                    "object": "block",
                    "type": "heading_1",
                    "heading_1": {
                        "rich_text": [{"type": "text", "text": {"content": "📊 프로젝트 현황"}}]
                    }
                },
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [
                            {"type": "text", "text": {"content": f"업데이트: {datetime.now().strftime('%Y년 %m월 %d일 %H:%M')}"}}
                        ]
                    }
                },
                {
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {
                        "rich_text": [{"type": "text", "text": {"content": "📁 파일 통계"}}]
                    }
                },
                {
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [
                            {"type": "text", "text": {"content": f"총 파일 수: {file_info.get('total_files', 0)}개"}}
                        ]
                    }
                },
                {
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [
                            {"type": "text", "text": {"content": f"디렉토리 수: {len(file_info.get('directories', []))}개"}}
                        ]
                    }
                }
            ]

            # Git 정보 추가
            if git_info:
                children.append({
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {
                        "rich_text": [{"type": "text", "text": {"content": "🔄 Git 정보"}}]
                    }
                })
                children.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [
                            {"type": "text", "text": {"content": f"브랜치: {git_info.get('branch', 'N/A')}"}}
                        ]
                    }
                })
                children.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [
                            {"type": "text", "text": {"content": f"총 커밋 수: {git_info.get('total_commits', 0)}개"}}
                        ]
                    }
                })

                # 최근 커밋 추가
                if git_info.get("commits"):
                    children.append({
                        "object": "block",
                        "type": "heading_3",
                        "heading_3": {
                            "rich_text": [{"type": "text", "text": {"content": "최근 커밋"}}]
                        }
                    })

                    for commit in git_info["commits"][:5]:
                        children.append({
                            "object": "block",
                            "type": "bulleted_list_item",
                            "bulleted_list_item": {
                                "rich_text": [
                                    {"type": "text", "text": {"content": f"{commit['hash']}: {commit['message'][:100]}"}}
                                ]
                            }
                        })

            # README 섹션 추가
            if readme_info.get("sections"):
                children.append({
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {
                        "rich_text": [{"type": "text", "text": {"content": "📝 README 섹션"}}]
                    }
                })

                for section in readme_info["sections"][:10]:
                    children.append({
                        "object": "block",
                        "type": "bulleted_list_item",
                        "bulleted_list_item": {
                            "rich_text": [
                                {"type": "text", "text": {"content": section}}
                            ]
                        }
                    })

            # Notion 페이지 생성
            new_page = self.notion.pages.create(
                parent={"database_id": self.database_id},
                properties=properties,
                children=children
            )

            return new_page["id"]

        except Exception as e:
            print(f"Notion 페이지 생성 실패: {e}")
            raise

    def sync_project(self) -> Dict[str, Any]:
        """프로젝트 정보를 수집하고 Notion에 동기화"""
        print("🔍 프로젝트 정보 수집 중...")

        # 데이터 수집
        data = {
            "readme": self.read_readme(),
            "git": self.get_git_info(),
            "files": self.scan_project_files(),
            "timestamp": datetime.now().isoformat()
        }

        print(f"✅ README: {data['readme'].get('word_count', 0)} 단어")
        print(f"✅ Git: {data['git'].get('total_commits', 0)} 커밋")
        print(f"✅ 파일: {data['files'].get('total_files', 0)}개")

        # 로컬 저장
        output_path = self.project_path / "notion-sync" / "project_snapshot.json"
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"💾 로컬 저장: {output_path}")

        # Notion에 동기화
        print("\n📤 Notion에 업로드 중...")
        page_id = self.create_notion_page(data)
        print(f"✅ Notion 페이지 생성 완료: {page_id}")

        return data


def main():
    """메인 실행 함수"""
    print("=" * 60)
    print("🌸 Am I Real Sia - Notion 프로젝트 동기화")
    print("=" * 60)
    print()

    # API 키 확인
    if not os.getenv("NOTION_API_KEY"):
        print("❌ 오류: NOTION_API_KEY가 설정되지 않았습니다.")
        print("📝 .env 파일을 생성하고 Notion API 키를 입력해주세요.")
        print("\n설정 방법:")
        print("1. https://www.notion.so/my-integrations 에서 Integration 생성")
        print("2. API Key 복사")
        print("3. .env 파일에 NOTION_API_KEY=your_key_here 입력")
        print("4. Notion 데이터베이스를 Integration에 연결")
        print("5. 데이터베이스 ID를 NOTION_DATABASE_ID에 입력")
        return

    try:
        syncer = NotionProjectSync()
        result = syncer.sync_project()

        print("\n" + "=" * 60)
        print("✨ 동기화 완료!")
        print("=" * 60)

    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")
        print("자세한 내용은 로그를 확인해주세요.")


if __name__ == "__main__":
    main()
