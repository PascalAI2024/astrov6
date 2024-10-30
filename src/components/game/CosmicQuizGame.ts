import type { GameConfig, GameState } from './types';

export default class CosmicQuizGame {
  private config: GameConfig;
  private state: GameState;

  constructor(config: GameConfig) {
    this.config = config;
    this.state = {
      currentQuestion: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      powerups: {},
      achievements: [],
      gameMode: null,
      timer: null
    };

    // Initialize game when constructed
    this.initializeGame();
  }

  private initializeGame(): void {
    this.setupEventListeners();
    this.loadSavedState();
    this.updateUI();
  }

  private setupEventListeners(): void {
    const difficultyButtons = document.querySelectorAll('.difficulty-select');
    difficultyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const difficulty = (e.currentTarget as HTMLElement).dataset.difficulty;
        if (difficulty) this.setDifficulty(difficulty);
      });
    });

    // Add event listeners for game controls
    document.getElementById('play-again')?.addEventListener('click', () => this.resetGame());
    document.getElementById('share-score')?.addEventListener('click', () => this.shareScore());
  }

  private loadSavedState(): void {
    try {
      const saved = localStorage.getItem('cosmicQuizState');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      console.error('Error loading saved state:', e);
    }
  }

  private saveState(): void {
    try {
      localStorage.setItem('cosmicQuizState', JSON.stringify(this.state));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  private updateUI(): void {
    const welcomeScreen = document.getElementById('welcome-screen');
    const gameArea = document.getElementById('game-area');
    const resultsScreen = document.getElementById('results-screen');

    if (welcomeScreen && gameArea && resultsScreen) {
      welcomeScreen.style.display = this.state.gameMode ? 'none' : 'block';
      gameArea.style.display = this.state.gameMode ? 'block' : 'none';
      resultsScreen.style.display = 'none';
    }

    this.updateScore();
    this.updateStreak();
  }

  private updateScore(): void {
    const scoreElement = document.getElementById('current-score');
    if (scoreElement) {
      scoreElement.textContent = this.state.score.toString();
    }
  }

  private updateStreak(): void {
    const streakElement = document.getElementById('current-streak');
    if (streakElement) {
      streakElement.textContent = this.state.streak.toString();
    }
  }

  private setDifficulty(difficulty: string): void {
    this.state.gameMode = difficulty;
    this.saveState();
    this.updateUI();
    this.startGame();
  }

  private startGame(): void {
    if (!this.state.gameMode) return;

    const welcomeScreen = document.getElementById('welcome-screen');
    const gameArea = document.getElementById('game-area');

    if (welcomeScreen && gameArea) {
      welcomeScreen.style.display = 'none';
      gameArea.style.display = 'block';
    }

    this.state.currentQuestion = 0;
    this.state.score = 0;
    this.state.streak = 0;
    this.loadQuestion();
  }

  private resetGame(): void {
    this.state.gameMode = null;
    this.updateUI();
  }

  private shareScore(): void {
    // Implement score sharing functionality
    const text = `I scored ${this.state.score} points in Cosmic Quiz! Can you beat my score?`;
    if (navigator.share) {
      navigator.share({
        title: 'Cosmic Quiz Score',
        text: text,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(text)
        .then(() => alert('Score copied to clipboard!'))
        .catch(console.error);
    }
  }

  private loadQuestion(): void {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const questionNumber = document.getElementById('question-number');
    const progressBar = document.getElementById('progress-bar');

    if (questionElement && answersElement && questionNumber && progressBar) {
      questionNumber.textContent = (this.state.currentQuestion + 1).toString();
      progressBar.style.width = `${(this.state.currentQuestion / 10) * 100}%`;

      // Sample question implementation
      questionElement.textContent = 'What is the closest star to Earth?';
      answersElement.innerHTML = `
        <button class="answer p-4 bg-gray-800/50 rounded-lg hover:bg-cosmic-600/50 transition-colors text-white">
          Proxima Centauri
        </button>
        <button class="answer p-4 bg-gray-800/50 rounded-lg hover:bg-cosmic-600/50 transition-colors text-white">
          Alpha Centauri
        </button>
        <button class="answer p-4 bg-gray-800/50 rounded-lg hover:bg-cosmic-600/50 transition-colors text-white">
          The Sun
        </button>
        <button class="answer p-4 bg-gray-800/50 rounded-lg hover:bg-cosmic-600/50 transition-colors text-white">
          Sirius
        </button>
      `;

      // Add click handlers for answers
      answersElement.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', () => this.handleAnswer(button as HTMLElement));
      });
    }
  }

  private handleAnswer(button: HTMLElement): void {
    // Sample answer handling
    const isCorrect = button.textContent?.includes('The Sun');
    
    if (isCorrect) {
      this.state.score += 100;
      this.state.streak++;
      if (this.state.streak > this.state.bestStreak) {
        this.state.bestStreak = this.state.streak;
      }
    } else {
      this.state.streak = 0;
    }

    this.updateUI();
    this.saveState();

    // Move to next question or end game
    this.state.currentQuestion++;
    if (this.state.currentQuestion >= 10) {
      this.endGame();
    } else {
      this.loadQuestion();
    }
  }

  private endGame(): void {
    const gameArea = document.getElementById('game-area');
    const resultsScreen = document.getElementById('results-screen');
    const finalScore = document.getElementById('final-score');
    const finalStreak = document.getElementById('final-streak');

    if (gameArea && resultsScreen && finalScore && finalStreak) {
      gameArea.style.display = 'none';
      resultsScreen.style.display = 'block';
      finalScore.textContent = this.state.score.toString();
      finalStreak.textContent = this.state.bestStreak.toString();
    }
  }
}