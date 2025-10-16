"""
Am I Real Sia - Notion 비공개 정보 동기화
공개 정보는 제외하고 비공개 정보만 Notion에 동기화합니다.
"""

import os
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List

from notion_client import Client
from dotenv import load_dotenv
import git

# 환경변수 로드
load_dotenv()

class PrivateNotionSync:
    def __init__(self):
        self.notion = Client(auth=os.getenv("NOTION_API_KEY"))
        self.page_id = os.getenv("NOTION_PAGE_ID")
        self.project_path = Path(os.getenv("PROJECT_PATH", "."))
        self.project_name = os.getenv("PROJECT_NAME", "Am I Real Sia")

    def should_sync_file(self, file_path: Path) -> bool:
        """파일을 동기화해야 하는지 확인 (비공개 파일만)"""
        file_str = str(file_path)

        # 동기화할 파일 패턴
        include_patterns = [
            'README_PRIVATE.md',
            'private/',
            'PRIVATE_',
            '.private.',
            'notion-sync/',
            'secrets/' # 경로만 표시, 내용은 제외
        ]

        # 절대 동기화하지 않을 패턴
        exclude_patterns = [
            '.env',
            'token',
            'key',
            '__pycache__',
            '.git',
            'node_modules'
        ]

        # 제외 패턴 체크
        for pattern in exclude_patterns:
            if pattern in file_str:
                return False

        # 포함 패턴 체크
        for pattern in include_patterns:
            if pattern in file_str:
                return True

        return False

    def scan_private_files(self) -> Dict[str, Any]:
        """비공개 파일만 스캔"""
        private_files = {
            "files": [],
            "total_count": 0,
            "directories": []
        }

        exclude_dirs = {'.git', 'node_modules', '__pycache__', '.venv', 'venv'}

        for root, dirs, files in os.walk(self.project_path):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]

            rel_path = Path(root).relative_to(self.project_path)

            for file in files:
                file_path = Path(root) / file
                rel_file = file_path.relative_to(self.project_path)

                if self.should_sync_file(rel_file):
                    private_files["files"].append(str(rel_file))
                    private_files["total_count"] += 1

        return private_files

    def read_private_readme(self) -> Dict[str, Any]:
        """비공개 README 읽기"""
        readme_path = self.project_path / "README_PRIVATE.md"

        if not readme_path.exists():
            return {}

        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()

        return {
            "exists": True,
            "word_count": len(content.split()),
            "sections": self._extract_sections(content),
            "last_modified": datetime.fromtimestamp(readme_path.stat().st_mtime).isoformat()
        }

    def _extract_sections(self, content: str) -> List[str]:
        """마크다운 섹션 추출"""
        sections = []
        for line in content.split('\n'):
            if line.startswith('## '):
                sections.append(line.replace('## ', '').strip())
        return sections

    def get_git_info(self) -> Dict[str, Any]:
        """Git 정보 (비공개 커밋 메시지 포함)"""
        try:
            repo = git.Repo(self.project_path)
            commits = list(repo.iter_commits('HEAD', max_count=10))
            commit_list = []

            for commit in commits:
                commit_list.append({
                    "hash": commit.hexsha[:7],
                    "message": commit.message.strip(),
                    "author": str(commit.author),
                    "date": commit.committed_datetime.strftime('%Y-%m-%d %H:%M')
                })

            return {
                "branch": repo.active_branch.name,
                "commits": commit_list,
                "total_commits": len(list(repo.iter_commits()))
            }
        except Exception as e:
            return {"error": str(e)}

    def get_env_status(self) -> Dict[str, bool]:
        """환경변수 파일 존재 확인 (내용은 보여주지 않음)"""
        env_files = [
            'notion-sync/.env',
            'sia-automation/secrets/.env'
        ]

        status = {}
        for env_file in env_files:
            path = self.project_path / env_file
            status[env_file] = path.exists()

        return status

    def append_to_notion(self, data: Dict[str, Any]) -> str:
        """비공개 정보를 Notion 페이지에 추가"""
        try:
            private_files = data.get("private_files", {})
            readme_info = data.get("private_readme", {})
            git_info = data.get("git", {})
            env_status = data.get("env_status", {})

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
                        "rich_text": [{"type": "text", "text": {"content": f"🔒 비공개 프로젝트 정보 - {datetime.now().strftime('%Y.%m.%d %H:%M')}"}}]
                    }
                },
                {
                    "object": "block",
                    "type": "callout",
                    "callout": {
                        "rich_text": [{"type": "text", "text": {"content": "⚠️ 이 정보는 비공개입니다. GitHub에는 동기화되지 않습니다."}}],
                        "icon": {"emoji": "🔒"}
                    }
                }
            ]

            # 비공개 README 정보
            if readme_info.get("exists"):
                children.append({
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {
                        "rich_text": [{"type": "text", "text": {"content": "📝 README_PRIVATE.md"}}]
                    }
                })
                children.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": f"단어 수: {readme_info.get('word_count', 0)}개"}}]
                    }
                })
                children.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": f"섹션 수: {len(readme_info.get('sections', []))}개"}}]
                    }
                })
                children.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": f"마지막 수정: {readme_info.get('last_modified', 'N/A')}"}}]
                    }
                })

            # 비공개 파일 목록
            children.append({
                "object": "block",
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [{"type": "text", "text": {"content": "📁 비공개 파일"}}]
                }
            })
            children.append({
                "object": "block",
                "type": "bulleted_list_item",
                "bulleted_list_item": {
                    "rich_text": [{"type": "text", "text": {"content": f"총 {private_files.get('total_count', 0)}개의 비공개 파일"}}]
                }
            })

            if private_files.get("files"):
                for file in private_files["files"][:10]:  # 최대 10개만 표시
                    children.append({
                        "object": "block",
                        "type": "bulleted_list_item",
                        "bulleted_list_item": {
                            "rich_text": [{"type": "text", "text": {"content": f"📄 {file}"}}]
                        }
                    })

            # 환경변수 파일 상태
            children.append({
                "object": "block",
                "type": "heading_2",
                "heading_2": {
                    "rich_text": [{"type": "text", "text": {"content": "🔐 환경변수 파일 상태"}}]
                }
            })

            for env_file, exists in env_status.items():
                status_icon = "✅" if exists else "❌"
                children.append({
                    "object": "block",
                    "type": "bulleted_list_item",
                    "bulleted_list_item": {
                        "rich_text": [{"type": "text", "text": {"content": f"{status_icon} {env_file}"}}]
                    }
                })

            # Git 정보
            if git_info and "error" not in git_info:
                children.append({
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {
                        "rich_text": [{"type": "text", "text": {"content": "🔄 Git 커밋 히스토리"}}]
                    }
                })

                for commit in git_info.get("commits", [])[:5]:
                    children.append({
                        "object": "block",
                        "type": "bulleted_list_item",
                        "bulleted_list_item": {
                            "rich_text": [{"type": "text", "text": {"content": f"{commit['hash']} - {commit['date']}"}}]
                        }
                    })

            # Notion 페이지에 추가
            self.notion.blocks.children.append(
                block_id=self.page_id,
                children=children
            )

            return self.page_id

        except Exception as e:
            print(f"Notion 업데이트 실패: {e}")
            raise

    def sync(self) -> Dict[str, Any]:
        """비공개 정보만 동기화"""
        print("🔒 비공개 정보 수집 중...")

        data = {
            "private_readme": self.read_private_readme(),
            "private_files": self.scan_private_files(),
            "git": self.get_git_info(),
            "env_status": self.get_env_status(),
            "timestamp": datetime.now().isoformat()
        }

        print(f"✅ README_PRIVATE: {data['private_readme'].get('word_count', 0)} 단어")
        print(f"✅ 비공개 파일: {data['private_files'].get('total_count', 0)}개")
        print(f"✅ Git 커밋: {data['git'].get('total_commits', 0)}개")

        # 로컬 저장 (비공개)
        output_path = self.project_path / "private" / "notion_sync_log.json"
        output_path.parent.mkdir(exist_ok=True)

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"💾 로컬 저장: {output_path}")

        # Notion에 동기화
        print("\n📤 Notion에 업로드 중...")
        self.append_to_notion(data)
        print(f"✅ Notion 업데이트 완료!")

        return data


def main():
    """메인 실행 함수"""
    print("=" * 60)
    print("🔒 Am I Real Sia - 비공개 정보 Notion 동기화")
    print("=" * 60)
    print()

    if not os.getenv("NOTION_API_KEY") or not os.getenv("NOTION_PAGE_ID"):
        print("❌ 오류: NOTION_API_KEY 또는 NOTION_PAGE_ID가 설정되지 않았습니다.")
        return

    try:
        syncer = PrivateNotionSync()
        syncer.sync()

        print("\n" + "=" * 60)
        print("✨ 비공개 정보 동기화 완료!")
        print("=" * 60)

    except Exception as e:
        print(f"\n❌ 오류: {e}")


if __name__ == "__main__":
    main()
