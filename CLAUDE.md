# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Astro that showcases projects, blogs, and technical notes. The site uses a hybrid content strategy:
- **Markdown content** (blogs/notes) stored in a Git submodule at `src/contents/` (repository: `notes-n-writings`)
- **Project data** (architecture/developer projects) fetched from a remote GraphQL CMS

## Common Commands

```bash
# Development
npm run dev              # Start dev server (default: http://localhost:4321)
npm run build            # Build for production
npm run preview          # Preview production build

# Content submodule management
git submodule update --init --recursive  # Initialize/update content submodule
git submodule update --remote            # Pull latest content from submodule
```

## Architecture Overview

### Content Collections System

The site uses Astro's Content Collections API with custom loaders defined in `src/content.config.ts`:

1. **Markdown Collections** (`blog`, `note`):
   - Loaded from `src/contents/` submodule using custom `markdownLoader`
   - Draft files in `**/drafts/**` are excluded via glob patterns
   - Cross-references between markdown files are tracked via `hasLinksTo` field

2. **Project Collections** (`archProject`, `devProject`):
   - Fetched at build time from remote GraphQL CMS
   - CMS integration code in `src/lib/cms/`
   - Credentials stored in `.env.local` (`ADMIN_URL`, `ADMIN_APIKEY`)

### Custom Markdown Processing Pipeline

The markdown system has custom remark/rehype plugins (in `src/lib/markdown/`):

**Remark plugins** (process markdown AST):
- `remarkReferenceTranslation`: Converts Obsidian-style internal links (`file.md`) to Astro routes (`/file`)
- `remarkImageTranslation`: Handles image path transformations
- `remarkMath`: Math notation support

**Rehype plugins** (process HTML AST):
- `rehypeExternalLinkAttr`: Adds attributes to external links
- `rehypeHashStyleHeadings`: Custom heading styles with hash links
- `rehypeSectionize`: Wraps content in semantic sections
- `rehypeMathjax`: Renders mathematical expressions

**Custom loader** (`markdownLoader`):
- Wraps base glob loader to extract cross-reference metadata
- Populates `hasLinksTo` field by processing internal links during build

### Routing Structure

```
/                         # Home page
/blog                     # All blogs
/blog/by/{author}         # Blogs filtered by author
/note                     # All notes
/note/by/{author}         # Notes filtered by author
/project/by/architect     # Architecture projects (from CMS)
/project/by/developer     # Developer projects (from CMS)
/writing                  # Combined blogs + notes view
/about                    # About page
```

### Path Aliasing

The project uses `@/` as an alias for `src/` directory (configured in `tsconfig.json`). Always use this alias for imports:
```typescript
import { SITE_TITLE } from '@/lib/utils/constants';
import BaseLayout from '@/components/layouts/Layout.Base.astro';
```

### Component Organization

- `src/components/layouts/`: Page layouts and major structural components
- `src/components/ui/`: Reusable UI components (Typography, Grid, Cards, etc.)
- `src/lib/theme/`: Theme utilities and CSS custom property management
- `src/styles/`: Global and modular CSS

## Important Notes

### Content Submodule
The `src/contents/` directory is a Git submodule. Content changes should be committed to the `notes-n-writings` repository separately. When adding/modifying content:
1. Make changes in `src/contents/`
2. Commit and push to the submodule repository
3. Update the parent repository to reference the new submodule commit

### Environment Variables
The `.env.local` file contains credentials for the GraphQL CMS that provides project data. These are required for building pages that display architecture/developer projects.

### Markdown Content Format
Blog posts and notes follow specific frontmatter schemas (see `src/content.config.ts`):
- Blogs require: `title`, `description`, `cover`, `tags`, `featured`, `created-date`, `last-updated-date`
- Notes require: `title`, `tags`, `created-date`, `last-updated-date`
- Internal links should use Obsidian format (`[[file.md]]` or `file.md`) - automatically converted to Astro routes

### Build-time Data Fetching
Project collections are fetched from the CMS during build (not at runtime). If the CMS is unavailable or credentials are invalid, the build will fail when trying to load project pages.
