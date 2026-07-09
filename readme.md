# HerConnect MVP 🚀

HerConnect is a high-fidelity, interactive mentorship network designed to empower women in tech and business by bridging the gap between student ambition and alumni success. This platform enables students to discover global industry mentors, request direct connection tokens, and join moderated domain-specific peer networks seamlessly.

Built from scratch during a 30-hour high-intensity hackathon sprint.

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS (Atomic layout structure)[cite: 1]
- **Routing:** React Router v6 (Client-side single-page mapping)[cite: 1]
- **Animations:** Framer Motion (Fluid hero presentation transitions)[cite: 1]
- **Iconography:** Lucide React[cite: 1]

### Production Architecture
The codebase strictly follows a modular presentation design separating layouts, business domains, views, and data collections:
```text
src/
├── data/          # Mock centralized database matrices
├── utils/         # Pure algorithmic utility modules (Deterministic Avatars)
├── components/    # Atomic reusable UI blocks (Buttons, Cards, Badges)
├── pages/         # Composite top-level routing view dashboard templates
├── App.jsx        # Routing assembly element
└── main.jsx       # App entry point mounting node