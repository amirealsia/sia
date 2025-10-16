"""
Am I Real Sia - Notion 페이지 동기화 스크립트 (간단 버전)
데이터베이스 대신 일반 페이지에 내용을 추가합니다.
"""

import os
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Any

from notion_client import Client
from dotenv import load_dotenv
import git

# 환경변수 로드
load_dotenv()

class NotionPageSync:
    def __init__(self):
        self.notion = Client(auth=os.getenv("NOTION_API_KEY"))
        self.page_id = os.getenv("NOTION_PAGE_ID")  # Database ID 대신 Page ID
        self.project_path = Path(os.getenv("PROJECT_PATH", "."))
        self.project_name = os.getenv("PROJECT_NAME", "Am I Real Sia")

    def read_readme(self) -> Dict[str, Any]:
        """README.md 파일을 읽어서 프로젝트 정보 추출"""
        readme_path = self.project_path / "README.md"

        if not readme_path.exists():
            return {}

        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()

        info = {
            "title": self.project_name,
            "content": content,
            "last_updated": datetime.now().isoformat(),
            "word_count": len(content.split()),
            "sections": self._extract_sections(content)
        }

        return info

    def _extract_sections(self, content: str) -> list:
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

        exclude_dirs = {'.git', 'node_modules', '__pycache__', '.venv', 'venv'}

        for root, dirs, files in os.walk(self.project_path):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]

            rel_path = Path(root).relative_to(self.project_path)
            if str(rel_path) != '.':
                file_info["directories"].append(str(rel_path))

            for file in files:
                file_info["total_files"] += 1
                ext = Path(file).suffix or 'no_extension'
                file_info["file_types"][ext] = file_info["file_types"].get(ext, 0) + 1

        return file_info

    def append_to_page(self, data: Dict[str, Any]) -> str:
        """Notion 페이지에 내용 추가"""
        try:
            readme_info = data.get("readme", {})
            git_info = data.get("git", {})
            file_info = data.get("files", {})

            # 추가할 블록 구성
            children = [
                {
                    "object": "block",
                    "type": "divider",
                    "divider": {}
                },
                {
                    "object": "block",
                    "type": "heading_1",
                    "heading_1": {
                        "rich_text": [{"type": "text", "text": {"content": f"📊 프로젝트 업데이트 - {datetime.now().strftime('%Y.%m.%d %H:%M')}"}}]
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
                        "rich_text": [{"type": "text", "text": {"content": f"총 파일 수: {file_info.get('total_files', 0)}개"}}]
                    }
                },
                {
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": f"디렉토리 수: {len(file_info.get('directories', []))}개"}}]
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
                        "rich_text": [{"type": "text", "text": {"content": f"브랜치: {git_info.get('branch', 'N/A')}"}}]
                    }
                })
                children.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": f"총 커밋 수: {git_info.get('total_commits', 0)}개"}}]
                    }
                })

                # 최근 커밋
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
                                "rich_text": [{"type": "text", "text": {"content": f"{commit['hash']}: {commit['message'][:100]}"}}]
                            }
                        })

            # README 섹션
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
                            "rich_text": [{"type": "text", "text": {"content": section}}]
                        }
                    })

            # 페이지에 블록 추가
            self.notion.blocks.children.append(
                block_id=self.page_id,
                children=children
            )

            return self.page_id

        except Exception as e:
            print(f"Notion 페이지 업데이트 실패: {e}")
            raise

    def sync_project(self) -> Dict[str, Any]:
        """프로젝트 정보를 수집하고 Notion에 동기화"""
        print("🔍 프로젝트 정보 수집 중...")

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
        page_id = self.append_to_page(data)
        print(f"✅ Notion 페이지 업데이트 완료!")
        print(f"🔗 https://notion.so/{page_id.replace('-', '')}")

        return data


def main():
    """메인 실행 함수"""
    import sys
    import io

    if sys.platform == 'win32':
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    print("=" * 60)
    print("🌸 Am I Real Sia - Notion 페이지 동기화")
    print("=" * 60)
    print()

    # API 키 확인
    if not os.getenv("NOTION_API_KEY"):
        print("❌ 오류: NOTION_API_KEY가 설정되지 않았습니다.")
        return

    if not os.getenv("NOTION_PAGE_ID"):
        print("❌ 오류: NOTION_PAGE_ID가 설정되지 않았습니다.")
        print("📝 .env 파일에 NOTION_PAGE_ID를 추가해주세요.")
        return

    try:
        syncer = NotionPageSync()
        result = syncer.sync_project()

        print("\n" + "=" * 60)
        print("✨ 동기화 완료!")
        print("=" * 60)

    except Exception as e:
        print(f"\n❌ 오류 발생: {e}")


if __name__ == "__main__":
    main()
