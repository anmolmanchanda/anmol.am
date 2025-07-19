# Claude AI Assistant Rules

## ⚠️ CRITICAL RULES - NEVER VIOLATE ⚠️

### 🚫 Commit Messages (ZERO TOLERANCE)
- **NEVER** add AI signatures to commits
- **NEVER** include "🤖 Generated with [Claude Code]" 
- **NEVER** include "Co-Authored-By: Claude"
- Keep commit messages clean and professional
- **User will cancel subscription if violated again**

### 📤 Push Immediately After Commit (MANDATORY)
- **ALWAYS ALWAYS ALWAYS push right after committing**
- **NEVER** leave commits unpushed
- `git commit` → `git push` (immediately)

### 🌳 Git Branching (STRICT)
- **ALWAYS create new branches from main ONLY**
- **NEVER create new branch until previous is merged to main**
- **NEVER work directly on main branch**
- Use format: `feature/description-name`

## 📋 Standard Workflow

### Every Development Session:
1. **Check current branch**: `git branch`
2. **Switch to main**: `git checkout main`
3. **Pull latest**: `git pull origin main`
4. **Create feature branch**: `git checkout -b feature/task-name`
5. **Make changes**
6. **Commit**: `git commit -m "Clear description"`
7. **Push immediately**: `git push -u origin feature/task-name`
8. **Create PR when ready**

### Code Quality Standards:
- Follow existing code patterns and conventions
- Test changes before committing
- Keep changes focused and atomic
- Use meaningful commit messages (no AI signatures!)
- Verify all functionality works before pushing

### Project-Specific Rules:
- **Today's date**: July 19, 2025
- **Portfolio start date**: July 18, 2025
- **Life Manager**: Started May 2025
- **N8N workflows**: January 2025
- **Apple Shortcuts**: July 2019 - Present (716+ shortcuts)
- **Article length target**: 7-minute average reading time
- **View tracking**: Uses Redis-Upstash, not Vercel KV

## 🔄 Remember This Sequence:
1. Code/Edit
2. Test locally
3. Git add
4. Git commit (clean message)
5. **Git push IMMEDIATELY**
6. Verify push succeeded

## ✅ Success Indicators:
- Clean commit history without AI signatures
- All commits pushed to remote immediately
- Proper branching workflow followed
- Code follows project conventions
- Features work as expected