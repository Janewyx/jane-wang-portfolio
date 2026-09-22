# Jane Wang — portfolio

A static portfolio with five projects, in order: Reading a short Arctic summer; Quantifying terrain change with InSAR; Greenland climate; Glacier mass balance; Mapping community exposure. No installation or build is required. Captions, references, legends and linked PDF/CSV/methods files are retained.

## Publish using GitHub's website

1. Sign in to GitHub as `Janewyx` and create a new, empty **public** repository named `jane-wang-portfolio`. Leave the initial README, .gitignore and licence options unselected; this folder supplies its own README and .gitignore. If using an existing repository, first inspect its files, README, branches, Settings → Pages, and any live site or CNAME. Do not replace existing content or change a live site's publishing source without reviewing it.
2. Upload the **contents** of the prepared `publishing` folder to the repository root, not the enclosing folder or the working project's `dist`, scripts, source projects or font files. On an empty repository choose **uploading an existing file**; otherwise choose **Add file → Upload files**. Drag the files and folders together to preserve their structure. Commit the upload to `main`.
3. Include `.nojekyll` and `.gitignore`. In Finder, press Command–Shift–Period to show hidden files. If the browser omits a dotfile, use **Add file → Create new file**, enter its exact name and copy its contents. For `.nojekyll`, a blank file or one newline is sufficient. Ensure `index.html`, `style.css`, `site.js`, `assets`, and all five project folders are at the repository root.
4. Open **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, then **main** and **/(root)**, and save. Wait for the Pages deployment in **Actions** to succeed, then use the site link shown in Settings → Pages.
5. For a project repository the URL is `https://janewyx.github.io/jane-wang-portfolio/`. A repository named exactly `USERNAME.github.io` serves at `https://USERNAME.github.io/`; check for an existing personal site before choosing that name.

GitHub browser uploads do not use `.gitignore` as a filter. Upload only the prepared files. Ignore rules also do not remove files already present in a repository. All supplied files are below GitHub's 25 MiB per-file browser upload limit; do not upload a ZIP in place of the website files.

## Update and republish

Edit this publishing copy's HTML, CSS, JavaScript or assets, retaining the relative paths. Use GitHub's pencil editor for small text changes, or **Add file → Upload files** for changed files. Upload nested files into their matching repository folder, or drag the corresponding top-level folder from the repository root. Review the destination paths and commit. Pages republishes automatically; confirm success in Actions and refresh the live site. A file removed locally remains online until deleted through GitHub's UI. Review any removals and keep the referenced downloads.

## Fonts and search visibility

This publishing copy self-hosts Inter variable fonts in `assets/fonts/inter/`, with the copyright notice and SIL Open Font License in `OFL.txt`. The supplied TTF files are used unchanged (only filenames are simplified); no build step is needed. CSS loads them locally with Arial/Helvetica fallbacks. Keep the licence with the fonts. Söhne OTFs are excluded from publishing; the supplied receipt covers desktop use. Existing scientific artwork is preserved.

The existing `noindex` tags are retained. The site is publicly accessible but asks search engines not to index it; this is not access control. To make it searchable, remove `<meta name="robots" content="noindex">` from all six HTML files and republish.

Sources: [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [browser uploads](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository), [Klim web licence](https://klim.co.nz/licences/web-fonts/).
