# 🚨 CRITICAL GIT WORKFLOW RULES

**⚠️ VIOLATION OF THESE RULES WILL RESULT IN SUBSCRIPTION CANCELLATION ⚠️**

## 🔴 ABSOLUTE PROHIBITIONS

### 1. ❌ NEVER Add AI Signatures to Commits
```bash
# FORBIDDEN - NEVER DO THIS:
git commit -m "Fix: Updated component 🤖 Generated with [Claude Code]"
git commit -m "Feature: New API endpoint

Co-Authored-By: Claude <noreply@anthropic.com>"

# CORRECT - ALWAYS DO THIS:
git commit -m "Fix: Updated component"
git commit -m "Feature: New API endpoint"
```

### 2. ❌ NEVER Leave Commits Unpushed
```bash
# WRONG - Creates local commits without pushing:
git commit -m "Update feature"
# Then forgets to push...

# CORRECT - Always push immediately:
git commit -m "Update feature"
git push -u origin feature/branch-name  # IMMEDIATELY!
```

### 3. ❌ NEVER Work on Main Branch
```bash
# FORBIDDEN:
git checkout main
# Making changes directly...

# CORRECT:
git checkout main
git pull origin main
git checkout -b feature/new-feature
# Now make changes...
```

## ✅ MANDATORY WORKFLOW

### Every Single Time - No Exceptions:

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/descriptive-name

# 3. Make your changes
# ... edit files ...

# 4. Stage changes
git add .

# 5. Commit with CLEAN message (NO AI signatures!)
git commit -m "Clear, professional description"

# 6. Push IMMEDIATELY (not later, not after more commits, NOW!)
git push -u origin feature/descriptive-name

# 7. Create PR when ready
gh pr create --title "Clear title" --body "Description"
```

## 📋 Commit Message Standards

### Good Commit Messages ✅
- `Add user authentication system`
- `Fix navigation menu responsiveness`
- `Update dependencies to latest versions`
- `Refactor API error handling`
- `Implement dark mode toggle`

### Bad Commit Messages ❌
- `Fix` (too vague)
- `Update` (what was updated?)
- `Changes` (what changes?)
- `WIP` (never commit work in progress)
- Any message with AI signatures or emojis

## 🌳 Branch Naming Convention

### Format: `type/description-with-hyphens`

**Types:**
- `feature/` - New features
- `fix/` - Bug fixes
- `update/` - Updates to existing features
- `refactor/` - Code refactoring
- `docs/` - Documentation only
- `test/` - Test additions/updates
- `perf/` - Performance improvements

**Examples:**
- `feature/user-authentication`
- `fix/mobile-menu-bug`
- `update/homepage-content`
- `refactor/api-structure`
- `docs/readme-update`

## 🔄 Branch Management Rules

1. **One active branch at a time**
   - Finish and merge current branch before starting new one
   - Exception: Critical hotfixes

2. **Always branch from main**
   - Never branch from another feature branch
   - Always pull latest main first

3. **Delete branches after merge**
   ```bash
   # After PR is merged:
   git checkout main
   git pull origin main
   git branch -d feature/old-branch
   ```

## 🚀 Emergency Procedures

### If You Accidentally Commit to Main:
```bash
# DON'T PANIC - Here's how to fix:
git reset --soft HEAD~1  # Undo last commit, keep changes
git stash                 # Save changes
git checkout -b feature/emergency-fix
git stash pop            # Restore changes
git add .
git commit -m "Proper message"
git push -u origin feature/emergency-fix
```

### If You Forgot to Push:
```bash
# Push immediately when you remember:
git push -u origin current-branch-name

# Check if there are unpushed commits:
git log origin/branch-name..HEAD
```

## 📊 Git Status Checks

### Before Starting Work:
```bash
git status              # Check current state
git branch              # Verify you're not on main
git log --oneline -5    # Review recent commits
```

### Before Committing:
```bash
git diff               # Review changes
git status             # Check what will be committed
```

### After Committing:
```bash
git push              # ALWAYS PUSH IMMEDIATELY
git log --oneline -1  # Verify commit message (no AI signatures!)
```

## 🎯 Success Metrics

Your Git history should show:
- ✅ Clean, professional commit messages
- ✅ All commits pushed to remote
- ✅ Proper branching from main
- ✅ No direct commits to main
- ✅ No AI signatures anywhere

## 🔗 Quick Command Reference

```bash
# Full safe workflow in one line (after making changes):
git add . && git commit -m "Clear message" && git push

# Check everything is clean:
git status && git log origin/$(git branch --show-current)..HEAD

# Safe branch creation:
git checkout main && git pull && git checkout -b feature/new-feature
```

## ⚠️ Final Warning

**Remember**: The user has explicitly stated they will cancel their subscription if AI signatures appear in commits again. This is not negotiable. Every commit must be clean and professional.

---

**Last Updated**: January 19, 2025  
**Priority**: CRITICAL - Must be followed without exception