# McRetro.net

The source repository for [McRetro.net](https://mcretro.net), my long-running home on the web.

McRetro.net is a retro-futurist personal website and archive covering vintage computers, game consoles, hardware repair, preservation, old websites, digital archaeology, personal projects, and whatever else has accumulated along the way.

The site has existed in various forms since 2015 and also incorporates material from earlier projects, particularly RetroJunkie.net, which began in 2012. Some of the history behind it stretches back much further.

## What is here?

This repository contains the complete static website, including:

- hundreds of blog posts dating back to 2012
- vintage computer and console repair notes
- hardware photographs and documentation
- technical guides and experiments
- archived personal homepages
- file and preservation resources
- category and monthly archives
- a searchable blog powered by Pagefind
- the custom layouts, includes and styling used by McRetro.net

The site deliberately keeps some of the character of the older web. Expect GIFs, questionable design decisions, dial-up nostalgia and a healthy amount of hardware that probably should not still work.

## Technology

McRetro.net is currently built as a static site using:

- [Jekyll](https://jekyllrb.com/) 4.4
- GitHub Pages
- GitHub Actions
- [Pagefind](https://pagefind.app/) for static search
- custom HTML, CSS and Markdown
- `jekyll-paginate`
- `jekyll-archives`
- `jekyll-sitemap`
- `jekyll-feed`
- `jekyll-seo-tag`

The production site is generated automatically from the `main` branch.

## Repository structure

```text
_posts/        Blog posts
_layouts/      Jekyll page and post layouts
_includes/     Reusable site components
_data/         Site data
assets/        Images, CSS and other static assets
files/         File archive content
homepages/     Preserved and recreated personal homepages
photos/        Photo gallery pages
search/        Search interface
tools/         Site tools and utilities
.github/       GitHub Actions deployment workflow
```

## Running locally

You will need Ruby, Bundler and Node.js.

Install the Ruby dependencies:

```bash
bundle install
```

Install the Node dependencies:

```bash
npm install
```

Run the site locally with Jekyll:

```bash
bundle exec jekyll serve
```

The site will normally be available at:

```text
http://localhost:4000
```

To build the static site and generate the Pagefind search index:

```bash
bundle exec jekyll build --destination _site
npx pagefind --site _site --output-subdir pagefind
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in:

```text
.github/workflows/jekyll.yml
```

The workflow:

1. installs Ruby and the Jekyll dependencies
2. builds the site into `_site`
3. installs Pagefind
4. generates the search index
5. uploads the resulting static site
6. deploys it through GitHub Pages

## Historical preservation

A large part of McRetro.net is intentionally archival.

Older posts are being progressively reviewed to improve sourcing, correct technical mistakes and preserve links where possible without rewriting the original history or personality of the posts.

Where substantive AI-assisted editorial work has been performed, the affected article records that assistance in its metadata and displays an editorial disclosure on the published page.

Contemporary quotations, observations and failed experiments are generally preserved rather than silently rewritten. Later information may instead be added around the original material where it helps explain what was actually happening.

## Internet archaeology

McRetro.net is also the spiritual successor to several earlier personal sites and projects, including:

- Sonic the Hedgehog Homepage
- Space / Planets Webpage
- Emulation Realm 124
- The Glitch
- RetroJunkie.net

Some surviving material has been reconstructed from old local files, archived copies and the Wayback Machine.

More history can be found on the [McRetro.net About page](https://mcretro.net/about/).

## Status

Very much alive.

The site is continuously being repaired, reorganised, fact-checked and filled with material that probably should have been documented properly the first time around.

That is half the fun.

## License

No repository-wide licence is currently declared. Unless a file or included project states otherwise, please do not assume that the contents are freely licensed for redistribution.
