# InstPrint Prototype

InstPrint is a small static front-end prototype for a Singapore-based printing marketplace. It connects customers who need printing with nearby home printer owners, using browser localStorage for demo persistence only.

## What this prototype includes

- Landing page with hero, pricing overview, FAQs, and testimonials
- Printer search and filtering for sample listings
- Printer owner registration form with validation
- Demo order workflow with PDF upload validation and manual page count entry
- Pricing calculator with service fee and platform commission
- Demo checkout with successful or failed simulated payment
- Customer order history and status advancement controls
- Owner dashboard and admin demo dashboard
- Browser localStorage persistence for prototype data

## Project files

- `index.html`
- `styles.css`
- `app.js`
- `data.js`
- `README.md`

## Local run

Because this project is a static website, there is no build step or package install required.

1. Download or clone the repository.
2. Open `index.html` directly in a browser.
3. Use the app locally.

## GitHub Pages deployment

1. Create a new public repository named `printnear` on GitHub.
2. Upload these files to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `data.js`
   - `README.md`
3. In GitHub, open the repository and go to Settings.
4. Open the Pages section.
5. Under Build and deployment, choose Source = Deploy from a branch.
6. Select the `main` branch and the root folder `/`.
7. Save the configuration.
8. GitHub Pages will publish the site at a URL like:
   `https://YOUR-USERNAME.github.io/printnear/`
9. Any future changes pushed to `main` will update the live site automatically.

### Optional GitHub Actions workflow

If you want automated deployment, add a file such as `.github/workflows/pages.yml` with a static website workflow:

```yaml
name: Deploy static site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Prototype limitations

This is a front-end demo only. It is intentionally designed to show how the product would work without a real backend or secure payments system.

Important limitations:

- localStorage is browser-specific and not shared between users or devices
- listings are not published to a remote database
- uploaded PDFs are kept in browser memory only for the current session
- no real credit card or payment processing happens
- no login accounts or secure backend are implemented
- this is not a production marketplace

## Demo pricing logic

The app uses illustrative pricing values for the prototype:

- Black-and-white: S$0.15/page
- Colour: S$0.40/page
- Customer service fee: S$0.50 per order
- Platform commission: 20% of the printing subtotal

The calculator uses:

- Printing subtotal = page count × copies × selected per-page price
- Customer total = printing subtotal + service fee
- Platform commission = printing subtotal × 20%
- Provider earnings = printing subtotal − platform commission

All pricing is shown as illustrative demo numbers only.

## Notes for future production

This prototype is structured so a real backend or payment provider could be integrated later, but the current version intentionally keeps the project static and easy to run on GitHub Pages.

## License

This project is intended for educational and prototype use.
