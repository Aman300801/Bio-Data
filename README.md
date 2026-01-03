# Bio Data Website - Marriage Profile

A beautiful, modern, and animation-filled bio data website for marriage profiles built with React. Features Apple-style scroll animations and a stunning UI.

## Features

- 🎨 Modern, beautiful design with gradient themes
- ✨ Apple-style scroll animations using Framer Motion
- 📱 Fully responsive design
- 🎯 Smooth scroll indicators
- 💫 Interactive hover effects
- 🌈 Gradient backgrounds and orbs
- 📋 Organized sections for all bio data details

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Customizing Your Data

Edit the `src/data/biodata.json` file to add your personal information. The website will automatically display all filled fields.

## Project Structure

```
BioData/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Hero section with animations
│   │   ├── Section.jsx       # Reusable section wrapper with scroll animations
│   │   ├── PersonalDetails.jsx
│   │   ├── EducationDetails.jsx
│   │   ├── ProfessionalDetails.jsx
│   │   ├── FamilyDetails.jsx
│   │   ├── LifestyleDetails.jsx
│   │   ├── ReligiousDetails.jsx
│   │   ├── ContactDetails.jsx
│   │   └── *.css             # Component styles
│   ├── data/
│   │   └── biodata.json     # Your bio data (edit this!)
│   ├── App.jsx              # Main app component
│   ├── App.css
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- React 18
- Vite
- Framer Motion (for animations)
- CSS3 (for styling)

## License

MIT

