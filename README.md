# 🏏 14-0: T20 Cricket Squad Draft & Season Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)

> A viral-style browser drafting game where players build an 11-man T20 cricket squad under real-world constraints and simulate a 14-match season to achieve an unbeaten **14-0** record.

---

## 🎮 Game Rules & Roster Constraints

1. **Roster Requirements:** Draft 11 positions across designated roles:
   - 2 Openers
   - 3 Middle Order
   - 2 All-Rounders
   - 1 Wicketkeeper
   - 3 Bowlers
2. **Overseas Cap:** Maximum of **4 foreign players** per playing XI.
3. **Draft Engine:** Players are drawn randomly from historical T20 league eras (2008–2026).
4. **Season Engine:** A probability-weighted simulation engine calculates performance against standard league benchmarks over 14 matches.

---

## 🛠 Tech Stack & Architecture

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6 Modules)
- **Data Pipeline:** Python script generating a JSON database of 200 player eras
- **Deployment:** GitHub Pages

```text
cricket-draft-simulator/
├── index.html          # Game UI and structural layout
├── style.css           # Styling, layout, and visual feedback
├── app.js              # Core state management, draft engine, and match simulator
├── generate_players.py # Python script to build/normalize the player dataset
├── players.json        # Auto-generated 200-player database
└── README.md           # Project documentation
```

---

## 🚀 Quick Start (Local Setup)

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/Vimal9RAM-NAP/14-zero-cricket-sim.git](https://github.com/Vimal9RAM-NAP/14-zero-cricket-sim.git)
   ```

2. **Navigate into the project directory:**

   ```bash
   cd 14-zero-cricket-sim
   ```

3. **(Optional) Rebuild the dataset using Python:**

   ```bash
   python3 generate_players.py
   ```

4. **Run locally:**
   - Open `index.html` directly in any web browser, **or**
   - Use the VS Code **Live Server** extension for local testing.

## 📈 Match Simulation Math

The team win probability $P(\text{Win})$ is computed using cumulative squad ratings vs. a baseline opponent rating ($O_{\text{score}} = 1600$):

$$\text{Team Score } (T) = \sum_{i=1}^{11} (\text{Batting}_i + \text{Bowling}_i)$$

$$P(\text{Win}) = \frac{T}{T + O_{\text{score}}}$$

For each match ($1$ to $14$), a pseudo-random value determines whether $r < P(\text{Win})$ to award a victory.

## ⚠️ Disclaimer

This repository is an open-source, non-commercial educational project built for portfolio and learning purposes. It is not affiliated with, endorsed by, or sponsored by any official cricket league or governing body. All player names and statistics belong to their respective copyright holders and owners.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
