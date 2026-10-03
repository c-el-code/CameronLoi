# Cameron Loi Portfolio

Static site, no build step. Open `index.html` in a browser or push the folder to GitHub Pages.

## Files

| File | Purpose |
| --- | --- |
| `data.js` | All text and project content. This is the file you edit. |
| `images/` | Project photos. |
| `index.html` | Page structure. |
| `style.css` | Look and feel. |
| `script.js` | Wafer, animations and modals. |

## Edit text

Open `data.js`. `SITE` holds your name, role, email and LinkedIn. `WAFERS` holds the three wafers, and each chip is one object with `title`, `what`, `how`, `why` and `tags`. In the chip popup on the Projects wafer, What, How and Why show as separate sub-headings, followed by "Skills used". On the Experience wafer, `what`, `how` and `why` are joined into one description under the photo (no headers), followed by "Skills used"; to write the description yourself, add a `description` field instead. On the Skills wafer the popup shows a single "SKILLS" header with the `tags` underneath, and chips show no dates.

## Magnification

The wafer opens at 1.25x, where chips are unlabeled. The 5x button, or clicking any chip, zooms the whole wafer into the centre, where the chips are, and shows an eyepiece view. Keep new chips close to the centre so they stay in view when zoomed. Switching wafers zooms back out and flips the wafer.

## Blank fields

Any field left empty (`""` or `[]`) is hidden in the popup, so a chip with no `how`, `why` or `tags` simply shows less. Two optional fields change the popup only: `heading` replaces the short chip title with a full name, and `role` replaces the subtitle in the line under the title.

## Bullet points

In `what`, `how`, `why` or `description`, start a line with `- ` to make it a bullet. Wrap the text in backticks to write it over several lines:

    what: `Short intro sentence.
    - First point
    - Second point`,

Or stay in normal quotes and use `\n` for each line break: `"Intro.\n- First point\n- Second point"`. Plain lines become paragraphs.

## Add a company logo to a chip

1. Put the logo in `images/logos/`, for example `images/logos/tsmc.svg`. SVG or a transparent PNG with a wide, short shape works best.
2. In `data.js`, set the chip's `logo` field to `"images/logos/tsmc.svg"`.

The logo is visible on the chip before you zoom in, centered in the tile, and moves to the top right corner once the wafer is zoomed in. Chips with an empty `logo` show nothing there. The field works on any wafer, but it is set up on the Experience chips.

## Add a photo to a chip

1. Put the image in `images/`, for example `images/cadence-layout.jpg`. Landscape 16:9 works best, and under 300 KB keeps the page fast.
2. In `data.js`, set the chip's `image` field to `"images/cadence-layout.jpg"`.

Chips with an empty `image` show a generated chip drawing.

## Add a new chip

1. Open the site with `?grid` at the end of the URL, for example `http://localhost:8000/index.html?grid`. Every free tile shows its `row,col` coordinates.
2. Copy an existing chip object in `data.js` into the right wafer, and set `row` and `col` to a free tile. Row and column are both 0 to 16, and the centre tile is 8,8. The grid is larger than the wafer, so tiles near the edge are cut off by the circle and corner tiles are hidden.
3. Give it a unique `code` such as `P-10` and fill in the text.

To remove a chip, delete its object.

## Run locally

    python3 -m http.server 8000

Then open http://localhost:8000.

## Publish on GitHub Pages

1. Push these files to a repository.
2. In the repository, go to Settings, then Pages, choose the `main` branch and the root folder, and save.
3. To use your own domain, add it under Pages and point a CNAME record at `<username>.github.io`.
