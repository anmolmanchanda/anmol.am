# 🚨 CRITICAL GIT WORKFLOW RULES - NEVER IGNORE 🚨

## ❌ MAJOR MISTAKE MADE: Working directly on main branch
**Date**: 2025-01-19  
**Error**: Committed features directly to main instead of using feature branches  
**Impact**: Violated fundamental git workflow principles  

## ✅ MANDATORY WORKFLOW - NO EXCEPTIONS

### 1. ALWAYS CREATE FEATURE BRANCH
```bash
# ALWAYS do this before ANY work
git checkout -b feature/description-of-work
```

### 2. NEVER WORK ON MAIN DIRECTLY
- ❌ `git checkout main` then start coding
- ✅ `git checkout -b feature/new-work` then start coding

### 3. PROPER WORKFLOW STEPS
```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-new-feature

# 3. Do all work on feature branch
# ... make changes ...
git add .
git commit -m "feature work"

# 4. Push feature branch
git push origin feature/my-new-feature

# 5. Create PR/merge only after review
# Never merge directly to main without review
```

### 4. BRANCH NAMING CONVENTIONS
- `feature/description` - New features
- `fix/issue-description` - Bug fixes  
- `chore/task-description` - Maintenance tasks
- `docs/update-description` - Documentation

### 5. PROTECTION RULES
- Main branch should be protected
- Require PR reviews before merge
- Run CI/CD checks on all branches
- Never force push to main

## 🔒 SAFEGUARDS TO IMPLEMENT

1. **Git Hooks**: Pre-commit hooks to warn about main branch
2. **Branch Protection**: GitHub branch protection rules
3. **Workflow Documentation**: This file as permanent reminder
4. **Team Guidelines**: Share with all contributors

## 📝 LEARNING FROM MISTAKES

This error happened because:
- Started on feature branch but kept switching to main
- Merged immediately without proper review
- Continued working on main instead of feature branch
- Lost track of proper workflow

**NEVER AGAIN**: Always check current branch before any work:
```bash
git branch  # Shows current branch with *
```

## ⚠️ EMERGENCY PROCEDURES

If accidentally working on main:
1. Immediately create feature branch: `git checkout -b feature/emergency-fix`
2. Continue work on feature branch
3. Never commit directly to main
4. Follow proper PR process

## 🎯 SUCCESS METRICS

- ✅ 0 direct commits to main
- ✅ All work done on feature branches  
- ✅ Proper PR review process
- ✅ Clean, linear git history
- ✅ Protected main branch

**REMEMBER: Main branch is sacred - protect it at all costs!**