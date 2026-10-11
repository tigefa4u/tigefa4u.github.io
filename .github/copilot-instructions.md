# tigefa4u.github.io - Copilot Instructions

This is a Jekyll-based GitHub Pages personal site containing personal notes and blog posts.

## ⚠️ Project Status

**Stagnant** - Last commit: May 2022. Blog posts are from 2013-2014. No new content in over 2 years.

## Build & Development

**Local development:**
```bash
bundle exec jekyll server -w
```
Site runs at http://localhost:4000

**CI Build:**
The `.github/workflows/jekyll.yml` uses the `jekyll/builder:latest` Docker image to build the site. It runs `jekyll build --future` with workspace mounted.

**No test/lint framework** - this is a static content site. Verification is manual browser preview.

## Project Structure

- `_config.yml` - Site settings (title, author, plugins, permalinks, etc.)
- `_layouts/` - HTML templates (default, page, post)
- `_includes/` - Reusable HTML fragments (header, comments, footer)
- `_posts/` - Blog posts (date-prefixed markdown files) — **content from 2013-2014**
- `articles/` - Additional article content (currently only `index.html`)
- `_site/` - Generated output (gitignored)
- `static/` - Static assets

## Key Conventions

- **Exclude list** in `_config.yml` lists files/dirs excluded from the Jekyll build (Gemfile, README, node_modules, etc.)
- **Permalink format**: `/articles/:day-month-year-title.html`
- **Plugins enabled**: jekyll-sitemap, jekyll-gist, jekyll-mentions, jekyll-paginate, jekyll-seo-tag, jekyll-feed
- **Disqus comments**: Integrated via `_includes/comments.html`, shortname from `site.author.disqus`
- **Analytics**: Google and Yandex configured in `_config.yml`
- **Posts** use front matter with `layout: default`, `title`, `date`, and other metadata
- **Bootstrap 4** is the CSS framework (loaded via the template includes)

## Adding Content

- New posts: Add a markdown file to `_posts/` with format `YYYY-MM-DD-title.md` (existing posts are from 2013-2014)
- New pages: Add a markdown file (no date prefix needed) or use the `articles/` directory
- Update `_config.yml` for site-wide settings (title, author, plugins, analytics)

**Note**: This repository appears to be a personal archive/blog that is no longer actively developed. Jekyll remains the underlying technology for GitHub Pages deployment.

**⚠️ CI Workflow Limitation**: The custom `.github/workflows/jekyll.yml` workflow sometimes fails due to gem dependency issues. The `jekyll/builder:latest` Docker image does not include the project's Gemfile gems (e.g., `octopress`, `github-pages`). This causes `Bundler::GemNotFound` errors when Jekyll's PluginManager tries to load gems from the Gemfile.

**Recommended approach**: The default GitHub Pages `pages build and deployment` workflow works correctly and is recommended for building and deploying this site. The custom `Jekyll site CI` workflow can be used for local development simulation, but may require Gemfile adjustments for the Docker image.

**Local development**: Use `mise run build` or `bundle exec jekyll build` directly (verified working outside Docker).