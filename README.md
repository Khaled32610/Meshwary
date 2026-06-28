Meshwary Landing Page
Meshwary is a responsive React landing page for a smart trip planning and fuel-cost saving app. The page introduces the product, highlights services and benefits, shows fuel price cards, and ends with a download/contact call to action.

Tech Stack
React 19
Vite 7
Plain CSS
Static image assets from public/assets
Getting Started
Install dependencies:

npm install
Run the local development server:

npm run dev
Build for production:

npm run build
Preview the production build:

npm run preview
Project Structure
meshywary-site/
  public/assets/     Static images and logos
  src/main.jsx       React components for the full landing page
  src/styles.css     Global styling and responsive layouts
  index.html         Vite entry HTML
  package.json       Scripts and dependencies
Page Sections
Header with Meshwary branding and navigation
Hero section with animated rotating keyword text
Services grid for app, fuel, assistant, and route planning features
Why Meshwary feature cards
Fuel prices showcase
About/download CTA
Final CTA footer with logo, contact button, and social links
Notes
The final footer currently uses placeholder social links for GitHub and LinkedIn.
The contact button uses mailto:hello@meshwary.app; update it when the production contact address is ready.
All visible page content and layout styles are managed in src/main.jsx and src/styles.css.