#!/usr/bin/env bash
# Gitflow release: bump the latest X.Y.Z tag, merge develop -> main via release/<version>,
# tag, merge the tag back into develop and push.
# Usage: scripts/release.sh [patch|minor|major]   (default: patch)
# Then deploy the tag with the server helper: see "Deployment" in README.md.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

BUMP="${1:-patch}"
case "$BUMP" in
  patch|minor|major) ;;
  *) echo "usage: $0 [patch|minor|major]" >&2; exit 1 ;;
esac

if [[ -n "$(git status --porcelain)" ]]; then
  echo "working tree not clean — commit or stash first" >&2
  exit 1
fi

git fetch origin
git checkout main
git pull --ff-only origin main
git checkout develop
git pull --ff-only origin develop

# Remote tags only, so a tag left behind by a failed run is never bumped past
CURRENT="$(git ls-remote --tags --refs origin | sed 's|.*refs/tags/||' | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -1 || true)"
IFS=. read -r MAJOR MINOR PATCH <<< "${CURRENT:-0.0.0}"
case "$BUMP" in
  patch) VERSION="$MAJOR.$MINOR.$((PATCH + 1))" ;;
  minor) VERSION="$MAJOR.$((MINOR + 1)).0" ;;
  major) VERSION="$((MAJOR + 1)).0.0" ;;
esac
BRANCH="release/$VERSION"

if git rev-parse -q --verify "refs/tags/$VERSION" >/dev/null || git rev-parse -q --verify "refs/heads/$BRANCH" >/dev/null; then
  echo "local tag $VERSION or branch $BRANCH left from a failed run — delete them first:" >&2
  echo "  git tag -d $VERSION; git branch -D $BRANCH" >&2
  exit 1
fi

echo "Releasing ${CURRENT:-none} -> $VERSION. Changes going to main:"
git log --oneline "origin/main..develop"
read -r -p "Continue? [y/N] " REPLY
[[ "$REPLY" == [yY] ]] || { echo "aborted"; exit 1; }

trap 'echo "
Release failed partway; nothing was pushed. To undo the local changes:
  git merge --abort; git checkout develop
  git reset --hard origin/develop; git branch -f main origin/main
  git branch -D $BRANCH; git tag -d $VERSION" >&2' ERR

git checkout -b "$BRANCH"
git checkout main
git merge --no-ff "$BRANCH" -m "Merge branch '$BRANCH'"
git tag -a "$VERSION" -m "$VERSION"

git checkout develop
git merge --no-ff "$VERSION" -m "Merge tag '$VERSION' into develop"
git branch -d "$BRANCH"

git push --atomic origin main develop "refs/tags/$VERSION"

echo
echo "Released $VERSION. Deploy it on the server with: attribution-builder-deploy $VERSION"
