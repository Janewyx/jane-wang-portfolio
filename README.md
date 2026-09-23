# Jane Wang — portfolio

A static portfolio with five projects, in order: Reading a short Arctic summer; Mapping community exposure; Greenland climate; Quantifying terrain change with InSAR; Glacier mass balance. No installation or build is required. Captions, references, legends and linked PDF/CSV/methods files are retained.

## Source and publishing workflow

This repository root is the maintained website source and the GitHub Pages publishing directory. Edit `index.html`, the project HTML files, `style.css`, `site.js` and `assets/` directly. There is no generated `publishing/` directory, build step or scientific plotting step required for copy changes. Do not create a second website copy.

GitHub Pages deploys `main` from `/(root)`; `.nojekyll` keeps the site static. Review and commit changes locally, then push to `main` only when ready to publish. Check the Pages deployment in Actions before reviewing the live site. Browser edits on GitHub can also be committed to `main`. Keep relative links and the required asset files together.

## DCRRA processing and presentation

The [published ACEC-BC project overview](https://acecbcawards.com/geospatial-analysis-provincial-disaster-and-climate-risk-and-resilience-assessment-dcrra/) specifies 1 km × 1 km vector processing grids. The portfolio's separate 8 km equal-area circle grid is a visual presentation. The four map assets remain independent visual reconstructions; the public project overview does not validate their displayed values.

## Search visibility


The existing `noindex` tags are retained. The site is publicly accessible but asks search engines not to index it; this is not access control. To make it searchable, remove `<meta name="robots" content="noindex">` from all six HTML files and republish.

Sources: [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [browser uploads](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).
