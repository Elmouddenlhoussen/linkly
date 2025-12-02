# 🤝 Contributing to Linkly

Thank you for your interest in contributing to Linkly! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Git
- Code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/linkly.git
cd linkly
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/Elmouddenlhoussen/linkly.git
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your environment variables
3. Set up the database:
```bash
npm run db:push
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔄 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Changes

- Write clean, readable code
- Follow the coding standards
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Test in development
npm run dev
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature"
```

See [Commit Guidelines](#commit-guidelines) for commit message format.

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

Go to GitHub and create a pull request from your fork to the main repository.

---

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use type inference where appropriate

```typescript
// Good
interface User {
  id: string
  email: string
  name: string | null
}

// Bad
const user: any = { ... }
```

### React Components

- Use functional components
- Use Server Components by default
- Add 'use client' only when needed
- Keep components small and focused

```typescript
// Server Component (default)
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component (when needed)
'use client'
export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### File Structure

```
src/
├── app/              # Next.js app router
│   ├── (auth)/      # Auth routes
│   ├── (dashboard)/ # Dashboard routes
│   └── api/         # API routes
├── components/       # React components
│   ├── dashboard/   # Dashboard-specific
│   └── ui/          # Reusable UI
├── lib/             # Utilities and configs
└── types/           # TypeScript types
```

### Naming Conventions

- **Files**: kebab-case (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Functions**: camelCase (`getUserData`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_LINKS`)
- **Types/Interfaces**: PascalCase (`UserData`)

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use trailing commas
- Max line length: 100 characters

```typescript
// Good
const user = {
  name: 'John',
  email: 'john@example.com',
}

// Bad
const user = {
  name: "John",
  email: "john@example.com"
}
```

### Imports

Order imports logically:

```typescript
// 1. React and Next.js
import { useState } from 'react'
import Link from 'next/link'

// 2. Third-party libraries
import { prisma } from '@/lib/prisma'
import toast from 'react-hot-toast'

// 3. Internal components
import { Button } from '@/components/ui/button'
import { Header } from '@/components/dashboard/header'

// 4. Types
import type { User } from '@/types'

// 5. Styles (if any)
import './styles.css'
```

---

## 💬 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
# Feature
git commit -m "feat(links): add custom slug support"

# Bug fix
git commit -m "fix(auth): resolve login redirect issue"

# Documentation
git commit -m "docs: update deployment guide"

# Refactor
git commit -m "refactor(api): simplify link creation logic"
```

### Rules

- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- Don't capitalize first letter
- No period at the end
- Keep subject line under 50 characters
- Separate subject from body with blank line

---

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices

### PR Title

Use the same format as commit messages:

```
feat(links): add bulk delete functionality
```

### PR Description

Include:

1. **What**: What changes were made
2. **Why**: Why these changes were needed
3. **How**: How the changes were implemented
4. **Testing**: How to test the changes
5. **Screenshots**: If UI changes (before/after)

### Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Steps to test the changes

## Screenshots (if applicable)
Before: [image]
After: [image]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested on multiple browsers
```

### Review Process

1. Maintainer will review your PR
2. Address any requested changes
3. Once approved, PR will be merged
4. Your contribution will be credited

---

## 🐛 Bug Reports

### Before Reporting

- Check if the bug has already been reported
- Try to reproduce the bug
- Gather relevant information

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

## Additional Context
Any other relevant information
```

---

## 💡 Feature Requests

### Before Requesting

- Check if feature has been requested
- Consider if it fits the project scope
- Think about implementation

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Other solutions you've considered

## Additional Context
Mockups, examples, etc.
```

---

## 🎨 UI/UX Guidelines

### Design Principles

- **Simplicity**: Keep interfaces clean and intuitive
- **Consistency**: Use existing patterns and components
- **Accessibility**: Ensure features are accessible
- **Responsiveness**: Test on all screen sizes

### Component Guidelines

- Use existing UI components when possible
- Follow the design system (colors, spacing, etc.)
- Ensure dark mode compatibility
- Add loading and error states

---

## 🧪 Testing Guidelines

### Manual Testing

- Test all user flows
- Test on different browsers
- Test on mobile devices
- Test with different data

### Automated Testing (Future)

```typescript
// Example test structure
describe('Link Creation', () => {
  it('should create a new link', async () => {
    // Test implementation
  })
  
  it('should validate URL format', async () => {
    // Test implementation
  })
})
```

---

## 📚 Documentation

### Code Documentation

```typescript
/**
 * Creates a new short link
 * @param url - The original URL to shorten
 * @param userId - The user ID creating the link
 * @param customSlug - Optional custom slug
 * @returns The created link object
 */
async function createLink(
  url: string,
  userId: string,
  customSlug?: string
): Promise<Link> {
  // Implementation
}
```

### README Updates

- Keep README.md up to date
- Update feature list
- Update screenshots
- Update installation steps

---

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the project

---

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Security**: Email [security contact]
- **General**: Contact [@Elmouddenlhoussen](https://github.com/Elmouddenlhoussen)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">
  <p>Thank you for contributing to Linkly! 🎉</p>
  <p>Built with ❤️ by <a href="https://github.com/Elmouddenlhoussen">Elmoudden Lhoussaine</a></p>
</div>
