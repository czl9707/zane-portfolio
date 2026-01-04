
# Zane Portfolio

My personal website! Here, I share my projects, technical writing, and misc notes.

## Tech Stack

- **Astro**: Modern static site builder for fast performance and flexibility
- **React**: Interactive UI components
- **PostCSS**: Advanced CSS processing
- **Markdown/MDX**: Content management for blogs and notes
- **D3.js**: Interactive knowledge graph visualization
- **Zod**: Runtime type validation for CMS data

## Project Structure

```
├── public/           # Static assets (images, favicon, etc.)
├── src/
│   ├── components/   # UI and layout components
│   ├── contents/     # Blog posts, notes, templates (Git submodule)
│   ├── lib/          # Utility and CMS logic
│   │   ├── cms/      # GraphQL CMS integration with Zod validation
│   │   ├── markdown/ # Custom remark/rehype plugins
│   │   ├── theme/    # Theme utilities and CSS variables
│   │   └── utils/    # Helper functions
│   ├── pages/        # Site pages and routes
│   └── styles/       # Global and modular CSS
├── astro.config.mjs  # Astro configuration
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
```

## Getting Started

### Prerequisites

Create a `.env.local` file in the root directory with your CMS credentials:

```bash
ADMIN_URL=https://your-cms-url.com
ADMIN_APIKEY=your-api-key-here
```

### Installation

Install dependencies and initialize the content submodule:

```bash
npm install
git submodule update --init --recursive
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Build Pipeline

### Content Processing Flow

The site uses a hybrid content strategy with two data sources:

#### 1. Markdown Content (Blogs & Notes)

```
src/contents/ (Git Submodule)
    ↓
Content Collections Loader (glob pattern)
    ↓
Custom Markdown Loader (markdown-loader.ts)
    ↓
Remark Plugins (Markdown AST)
    • remarkReferenceTranslation - Convert Obsidian links to routes
    • remarkImageTranslation - Fix relative image paths
    • remarkMath - Parse LaTeX math notation
    ↓
Rehype Plugins (HTML AST)
    • rehypeExternalLinkAttr - Add attributes to external links
    • rehypeHashStyleHeadings - Add hash-style heading IDs
    • rehypeSectionize - Wrap content in semantic sections
    • rehypeMathjax - Render mathematical expressions
    ↓
Static HTML Pages + Knowledge Graph Data
```

#### 2. Project Data (Architecture & Developer Projects)

```
GraphQL CMS API
    ↓
graphqlFetch() - Error handling & validation
    ↓
Zod Schema Validation
    ↓
DTO → TypeScript Interface Transformation
    ↓
Astro Content Collections
    ↓
Static Project Pages
```

### Markdown Processing Details

The markdown pipeline includes custom plugins for Obsidian compatibility:

- **Reference Translation**: Converts `blog/post.md` → `/blog/post` and tracks internal links for the knowledge graph
- **Image Translation**: Converts `Media/image.png` → `/src/contents/Media/image.png`
- **Sectionize**: Wraps content in `<section>` elements for table of contents generation

### Error Handling

All CMS data fetching includes comprehensive error handling:
- Network error detection
- HTTP status validation
- GraphQL error parsing
- Zod schema validation
- Detailed error messages via `CMSError` class

### Type Safety

- **Build-time validation**: Content collection schemas ensure correct frontmatter
- **Runtime validation**: Zod schemas validate all CMS API responses
- **TypeScript strict mode**: Full type safety across the codebase

