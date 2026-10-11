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
The `.github/workflows/jekyll.yml` workflow builds the site on GitHub Actions using `bundle exec jekyll build --future` with Ruby 3.4.11 and the project's gems installed via `bundle install`. This runs reliably on every push and pull request to the `master` branch.

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

**⚠️ CI Workflow Fixed**: The `.github/workflows/jekyll.yml` workflow was updated to build the site directly on the GitHub Actions runner using `bundle exec jekyll build --future`, instead of using the `jekyll/builder:latest` Docker image. This avoids the gem dependency mismatch since the runner has access to the project's installed gems via `bundle install`.

The workflow now:
1. Sets up Ruby 3.4.11 via `ruby/setup-ruby`
2. Installs dependencies with `bundle install`
3. Builds the site with `bundle exec jekyll build --future`

This approach works reliably because it uses the same Ruby and gem environment both locally (via `mise`) and in CI.

**Local development**: Use `mise run build` or `bundle exec jekyll build` directly (verified working).