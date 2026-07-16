import shutil
from pathlib import Path


PROJECT_ROOT = Path.cwd()


def remove(path: str) -> None:
    target = PROJECT_ROOT / path
    if target.is_dir():
        shutil.rmtree(target)
    elif target.exists():
        target.unlink()


if "{{ cookiecutter.publish_to_npm }}" != "yes":
    remove(".github/workflows/publish.yml")

