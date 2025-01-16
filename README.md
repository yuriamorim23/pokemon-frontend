# Pokémon Game - Frontend

Welcome to the frontend of the **Pokémon Game**! This project is an interactive Angular application where players try to guess the hidden Pokémon based on its silhouette.

## 📌 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [How to Play](#how-to-play)
- [Consumed Endpoints](#consumed-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 🔍 Overview
The **Pokémon Game** is a guessing game where the user has **2 minutes** to correctly identify as many Pokémon as possible based on their silhouettes. The game fetches data from the **PokéAPI** and backend services to display images and random choices.

---

## 🚀 Features
✔️ Display of Pokémon silhouettes.  
✔️ Multiple-choice options to guess the correct name.  
✔️ Countdown timer of **2 minutes** ⏳.  
✔️ Score tracking for correct answers.  
✔️ Visual feedback for correct and incorrect guesses.  
✔️ Animated **Start Game** button for engagement.  
✔️ Automatic game reset when time expires.  
✔️ Responsive and dynamic UI.  

---

## 🛠️ Technologies Used
The frontend is built using:
- **Angular 16**
- **TypeScript**
- **SCSS**
- **Bootstrap**
- **RxJS** (for handling observables)
- **PokéAPI** (for fetching Pokémon data)

---

## 📥 Installation and Setup
### Prerequisites
Before starting, ensure you have installed:
- **Node.js** (version 16 or later)
- **Angular CLI** (if not installed, run `npm install -g @angular/cli`)
- **Git** (for cloning the repository)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yuriamorim23/pokemon-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pokemon-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   ng serve
   ```
5. Access the game at `http://localhost:4200`.

---

## 🎮 How to Play
1. Click the **"Start Game"** button to begin.
2. The countdown timer starts at **2 minutes** ⏳.
3. Identify the silhouette of the Pokémon and choose one of the given options.
4. If the answer is correct, **+1 point** is added to your score.
5. Continue guessing until the timer runs out.
6. When time is up, a message appears, and you can restart the game.

---

## 🌐 Consumed Endpoints
The frontend communicates with the backend through the following endpoints:

### 1️⃣ **Get a Random Pokémon**
- **URL**: `GET http://localhost:8080/api/v1/pokemon/{id}`
- **Description**: Returns a random Pokémon with its options.
- **Example Response**:
  ```json
  {
    "id": 103,
    "name": "exeggutor",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png",
    "options": ["exeggutor", "fletchling", "palkia"]
  }
  ```

### 2️⃣ **Verify Answer**
- **URL**: `POST http://localhost:8080/api/v1/pokemon/verify?id={id}&guess={name}`
- **Description**: Checks if the user's answer is correct.
- **Example Correct Response**:
  ```json
  {
    "trueName": "exeggutor",
    "fullImageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png",
    "correct": true
  }
  ```
- **Example Incorrect Response**:
  ```json
  {
    "trueName": "exeggutor",
    "fullImageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png",
    "correct": false
  }
  ```

---

## 🤝 Contributing
Want to contribute? Follow these steps:

1. **Fork** this repository.
2. Create a **feature branch**:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Make your changes.
4. **Commit** your updates:
   ```bash
   git commit -m "Added a new feature"
   ```
5. **Push** to the remote repository:
   ```bash
   git push origin feature/new-feature
   ```
6. Open a **Pull Request** on GitHub.

---

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

---

🔹 **Developed by Yuri Amorim** 🚀  
For any questions or suggestions, feel free to reach out! 😃