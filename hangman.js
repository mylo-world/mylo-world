import tkinter from 'tkinter';
import { Image, ImageTk, ImageDraw, ImageFont } from 'PIL';
import scrolledtext from 'tkinter.scrolledtext';
import os from 'os';
import random from 'random';
import pygame from 'pygame';

const BASE_DIR = os.path.dirname(os.path.abspath(hangman.js));

function relativePath(relative) {
    const baseDir = os.path.dirname(os.path.abspath(hangman.js));,
    return os.path.join(baseDir, relative);
}

function SetBackground(master, path) {
    const image = Image.open(path);
    const screenWidth = master.winfo_screenwidth();
    const screenHeight = master.winfo_screenheight();
    const resizedImage = image.resize([screenWidth, screenHeight], Image.Resampling.LANCZOS);
    const photo = ImageTk.PhotoImage(resizedImage);
    const background = new tk.Label(master, { image: photo });
    background.image = photo;
    background.place({ x: 0, y: 0, relwidth: 1, relheight: 1 });
}

// Font To Image
function createTextImage(text, fontPath, fontSize, color, bgColor, size) {
    const font = ImageFont.truetype(fontPath, fontSize);
    const image = Image.new("RGBA", size, bgColor);
    const draw = ImageDraw.Draw(image);
    
    const textBbox = draw.textbbox([0, 0], text, { font: font });
    const textWidth = textBbox[2] - textBbox[0];
    const textHeight = textBbox[3] - textBbox[1];
    
    const textX = (size[0] - textWidth) / 2;
    const textY = (size[1] - textHeight) / 2;
    
    draw.text([textX, textY], text, { font: font, fill: color });
    return ImageTk.PhotoImage(image);
}

function photoloader(path, x = 100, y = 100) {
    const image = Image.open(path);
    const resizedImage = image.resize([x, y], Image.Resampling.LANCZOS);
    const photo = ImageTk.PhotoImage(resizedImage);
    return photo;
}

function animateLabel(label, master, x = 0, y = 0, xSpeed = 5, ySpeed = 0, xBounds = [0, 800], yBounds = [0, 600]) {
    function move() {
        // Update positions
        x += xSpeed;
        y += ySpeed;

        // Reverse direction if reaching bounds
        if (x < xBounds[0] || x > xBounds[1]) {
            xSpeed = -xSpeed;
        }
        if (y < yBounds[0] || y > yBounds[1]) {
            ySpeed = -ySpeed;
        }

        // Move the label
        label.place({ x: x, y: y });
        
        // Call this function again after a short delay
        master.after(30, move);
    }
    
    move();
}

// Music Section
pygame.mixer.init();
pygame.mixer.music.set_volume(0.5);

function playClickSound() {
    try {
        const clickSoundPath = relativePath("Assets/ClickNoise.mp3");
        const clickSound = pygame.mixer.Sound(clickSoundPath);
        clickSound.play();
    } catch (e) {
        console.error(`Error playing click sound: ${e}`);
    }
}

function playCorrectSound() {
    try {
        const correctSoundPath = relativePath("Assets/CorrectNoise.mp3");
        const correctSound = pygame.mixer.Sound(correctSoundPath);
        correctSound.play();
    } catch (e) {
        console.error(`Error playing correct sound: ${e}`);
    }
}

function playWrongSound() {
    try {
        const wrongSoundPath = relativePath("Assets/WrongNoise.mp3");
        const wrongSound = pygame.mixer.Sound(wrongSoundPath);
        wrongSound.play();
    } catch (e) {
        console.error(`Error playing wrong sound: ${e}`);
    }
}

function playMusic() {
    try {
        pygame.mixer.music.load(relativePath("Assets/Main Ost.mp3"));
        pygame.mixer.music.play(-1);
        pygame.mixer.music.set_volume(0.5);
    } catch (e) {
        console.error(`Error loading music: ${e}`);
    }
}

playMusic();

// Function to load scores from the text file
function loadScores(filePath = "scores.txt") {
    const playerScores = {};
    try {
        const file = open(filePath, "r");
        for (const line of file) {
            const [name, score] = line.strip().split(":");
            playerScores[name] = parseInt(score);
        }
    } catch (e) {
        if (e instanceof FileNotFoundError) {
            return {};
        }
    }
    return playerScores;
}

// Function to save scores to the text file
function saveScores(playerScores, filePath = "scores.txt") {
    const file = open(filePath, "w");
    for (const [name, score] of Object.entries(playerScores)) {
        file.write(`${name}:${score}\n`);
    }
}

// Function to update a player's score
function updateUserScore(points) {
    if (globalUsername) {  // Ensure a user is logged in
        if (globalUsername in playerScores) {
            playerScores[globalUsername] += points;
        } else {
            playerScores[globalUsername] = points;  // Initialize score if missing
        }
        saveScores(playerScores);  // Save updated scores to the file
    } else {
        console.log("No user is logged in.");
    }
}

let playerScores = loadScores();

class StartMenu {
    constructor(master) {
        this.master = master;
        master.configure({ bg: '' });
        master.title("Hangman's Gambit");
        master.state('zoomed');

        const Rocabe = relativePath("Assets/Fonts/RocabeTrialRegular-OGMep.ttf");
        const Arcade = relativePath("Assets/Fonts/KarmaticArcade-6Yrp1.ttf");

        const frame1 = new tk.Frame(master);
        frame1.place({ relx: 0.5, rely: 0.5, anchor: "center", relwidth: 1, relheight: 1 });

        SetBackground(frame1, relativePath("Assets/frame1.png"));

        const Cloud1Path = photoloader(relativePath("Assets/c1.png"), 225, 45);
        const Cloud2Path = photoloader(relativePath("Assets/c2.png"), 225, 45);
        const Cloud3Path = photoloader(relativePath("Assets/c3.png"), 110, 45);
        const Cloud4Path = photoloader(relativePath("Assets/c4.png"), 110, 45);

        const Cloud1 = new tk.Label(frame1, { image: Cloud1Path, borderwidth: 0, bg: "#12022b" });
        Cloud1.image = Cloud1Path;
        Cloud1.place({ relx: 0.1, rely: 0.1, anchor: 'center' });
        animateLabel(Cloud1, frame1, 75, 50, 1, 0, [75, 100], [0, 500]);

        const Cloud2 = new tk.Label(frame1, { image: Cloud2Path, borderwidth: 0, bg: "#12022b" });
        Cloud2.image = Cloud2Path;
        Cloud2.place({ relx: 0.75, rely: 0.1, anchor: 'center' });
        animateLabel(Cloud2, frame1, 75, 50, 1, 0, [75, 100], [0, 500]);

        const Cloud3 = new tk.Label(frame1, { image: Cloud3Path, borderwidth: 0, bg: "#12022b" });
        Cloud3.image = Cloud3Path;
        Cloud3.place({ relx: 0.08, rely: 0.17, anchor: 'center' });
        animateLabel(Cloud3, frame1, 20, 75, 1, 0, [20, 45], [0, 500]);

        const Cloud4 = new tk.Label(frame1, { image: Cloud4Path, borderwidth: 0, bg: "#12022b" });
        Cloud4.image = Cloud4Path;
        Cloud4.place({ relx: 0.87, rely: 0.17, anchor: 'center' });
        animateLabel(Cloud4, frame1, 20, 75, 1, 0, [20, 45], [0, 500]);

        const titleImage = createTextImage(
            "Hangman's Gambit",
            Arcade,
            75,
            "white",
            "#12022b",
            [1000, 100]
        );

        const titleLabel = new tk.Label(frame1, { image: titleImage, borderwidth: 0 });
        titleLabel.image = titleImage;
        titleLabel.place({ relx: 0.5, rely: 0.60, anchor: 'center' });

        const transition = () => {
            playClickSound();
            for (const widget of master.winfo_children()) {
                widget.destroy();
            }
            new UserLogin(master);
        };

        const destroy = () => {
            playClickSound();
            master.destroy();
        };

        const startButton = createTextImage(
            "Start Game",
            Rocabe,
            20,
            "white",
            "#12022b",
            [850, 150]
        );

        this.button1 = new tk.Button(
            frame1,
            { image: startButton, command: transition, width: 175, height: 75, bg: '#12022b', relief: "flat", borderwidth: 0 }
        );
        this.button1.image = startButton;
        this.button1.place({ relx: 0.5, rely: 0.75, anchor: 'center' });

        const exitButton = createTextImage(
            "Exit",
            Rocabe,
            20,
            "white",
            "#12022b",
            [850, 150]
        );

        this.button2 = new tk.Button(
            frame1,
            { image: exitButton, command: destroy, width: 175, height: 75, bg: '#12022b', relief: "flat", borderwidth: 0 }
        );
        this.button2.image = exitButton;
        this.button2.place({ relx: 0.5, rely: 0.85, anchor: 'center' });
    }
}

class UserLogin {
    constructor(master) {
        this.master = master;
        master.configure({ bg: 'grey' });
        master.title("Hangman's Gambit");
        master.state('zoomed');

        const frame1 = new tk.Frame(master);
        frame1.place({ relx: 0.5, rely: 0.5, anchor: "center", relwidth: 1, relheight: 1 });

        SetBackground(frame1, relativePath("Assets/frame2.png"));

        const Rocabe = relativePath("Assets/Fonts/RocabeTrialRegular-OGMep.ttf");
        const Arcade = relativePath("Assets/Fonts/KarmaticArcade-6Yrp1.ttf");
        const TextforLogin = createTextImage(
            "Enter Your Name",
            Arcade,
            20,
            "white",
            "#12022b",
            [850, 350]
        );
        this.label_name = new tk.Label(frame1, { image: TextforLogin, borderwidth: 0 });
        this.label_name.image = TextforLogin;
        this.label_name.place({ relx: 0.7, rely: 0.4, anchor: 'center' });

        this.entry_name = new tk.Entry(frame1, { width: 30, font: ["Helvetica", 12] });
        this.entry_name.place({ relx: 0.7, rely: 0.45, anchor: 'center' });

        const transition = () => {
            playClickSound();
            for (const widget of master.winfo_children()) {
                widget.destroy();
            }
            new SelectCategory(master);
        };

        const gotoleaderboard = () => {
            playClickSound();
            for (const widget of master.winfo_children()) {
                widget.destroy();
            }
            new Leaderboard(master);
        };

        const login = () => {
            globalUsername = this.entry_name.get().strip();
            if (globalUsername) {
                if (!(globalUsername in playerScores)) {
                    playerScores[globalUsername] = 0;  // Initialize score
                    saveScores(playerScores);  // Save new user to file
                }
                transition();
            } else {
                const WarningLabel = createTextImage(
                    "Please Enter Your Name",
                    relativePath("Assets/Fonts/RocabeTrialRegular-OGMep.ttf"),
                    15,
                    "white",
                    "#12022b",
                    [850, 20]
                );
                const Warn = new tk.Label(frame1, { image: WarningLabel, borderwidth: 0 });
                Warn.image = WarningLabel;
                Warn.place({ relx: 0.7, rely: 0.50, anchor: 'center' });
            }
        };

        const LoginButton = createTextImage(
            "Log In",
            Rocabe,
            25,
            "white",
            "#12022b",
            [850, 350]
        );

        this.button_login = new tk.Button(
            frame1,
            { image: LoginButton, command: login, width: 115, height: 75, bg: '#FF00FF', borderwidth: 0 }
        );
        this.button_login.image = LoginButton;
        this.button_login.place({ relx: 0.7, rely: 0.55, anchor: 'center' });

        const LeaderButton = createTextImage(
            "Leaderboards",
            Rocabe,
            25,
            "white",
            "#12022b",
            [850, 350]
        );

        this.button_login = new tk.Button(
            frame1,
            { image: LeaderButton, command: gotoleaderboard, width: 255, height: 75, bg: '#FF00FF', borderwidth: 0 }
        );
        this.button_login.image = LeaderButton;
        this.button_login.place({ relx: 0.7, rely: 0.65, anchor: 'center' });
    }
}

class Leaderboard {
    constructor(master) {
        this.master = master;
        master.configure({ bg: 'white' });
        master.title("Hangman's Gambit");
        master.state('zoomed');
        const frame1 = new tk.Frame(master);
        frame1.place({ relx: 0.5, rely: 0.5, anchor: "center", relwidth: 1, relheight: 1 });

        SetBackground(frame1, relativePath("Assets/frame3.png"));
        const Rocabe = relativePath("Assets/Fonts/RocabeTrialRegular-OGMep.ttf");
        const Arcade = relativePath("Assets/Fonts/KarmaticArcade-6Yrp1.ttf");

        const TitleText = createTextImage(
            "Leaderboards",
            Arcade,
            45,
            "white",
            "#12022b",
            [1000, 100]
        );
        this.label_category = new tk.Label(frame1, { image: TitleText, borderwidth: 0 });
        this.label_category.image = TitleText;
        this.label_category.place({ relx: 0.5, rely: 0.1, anchor: 'center', x: 0, y: 0 });

        // Load scores from file
        playerScores = loadScores();

        // Sort and display leaderboard
        const sortedScores = Object.entries(playerScores).sort((a, b) => b[1] - a[1]);
        const cut = sortedScores.slice(0, 5);
        const leaderboardText = "Rank | Name | Score\n \n" + cut.map((entry, i) => `${i + 1}.`.ljust(0) + `${entry[0]}`.ljust(10, ".") + `${entry[1]}`.rjust(20, ".")).join("\n");
        const leaderboardLabel = new tk.Label(
            frame1,
            { text: leaderboardText, font: ["Helvetica", 16], justify: "left", bg: "#12022b", fg: "white" }
        );
        leaderboardLabel.place({ relx: 0.5, rely: 0.3, anchor: 'n' });

        const transition = () => {
            playClickSound();
            for (const widget of master.winfo_children()) {
                widget.destroy();
            }
            new UserLogin(master);
        };
        const exitButton = createTextImage(
            "Exit",
            Rocabe,
            20,
            "white",
            "#12022b",
            [850, 150]
        );

        this.button2 = new tk.Button(
            frame1,
            { image: exitButton, command: transition, width: 175, height: 75, bg: '#12022b', relief: "flat", borderwidth: 0 }
        );
        this.button2.image = exitButton;
        this.button2.place({ relx: 0.5, rely: 0.75, anchor: 'center' });
    }
}

class SelectCategory {
    constructor(master) {
        this.master = master;
        master.configure({ bg: 'white' });
        master.title("Hangman's Gambit");
        master.state('zoomed');
        const frame1 = new tk.Frame(master);
        frame1.place({ relx: 0.5, rely: 0.5, anchor: "center", relwidth: 1, relheight: 1 });

        SetBackground(frame1, relativePath("Assets/frame3.png"));

        const Rocabe = relativePath("Assets/Fonts/RocabeTrialRegular-OGMep.ttf");
        const categories = {
            "Tech n CompSci": "Assets/1.png",
            "Natural Science": "Assets/2.png",
            "Humanities n Social Science": "Assets/3.png",
            "Business n Economics": "Assets/4.png",
            "Engineering": "Assets/5.png",
            "Health n Medicine": "Assets/6.png",
            "Academic": "Assets/7.png",
            "Study n Research": "Assets/8.png"
        };

        this.categoryImages = [];

        Object.entries(categories).forEach(([category, imageFile], idx) => {
            const image = Image.open(relativePath(imageFile)).convert("RGBA");
            const resizedImage = image.resize([100, 100], Image.Resampling.LANCZOS);
            const photo = ImageTk.PhotoImage(resizedImage);
            this.categoryImages.push(photo);
        
            const categoryWithNewline = category === "Natural Science" ? category.replace(" ", "\n") : category.replace(" n ", " n\n");
            const textCategory = categoryWithNewline.center(15);

            const CategoryLabel = createTextImage(
                textCategory,
                Rocabe,
                18,
                "white",
                "#12022b",
                [200, 50]
            );
            
            const button = new tk.Button(
                frame1,
                { image: photo, command: () => this.startGame(category), borderwidth: 0, highlightthickness: 0, bg: '#12022b', activebackground: '#12022b' }
            );

            const row = Math.floor(idx / 4);
            const col = idx % 4;
            const xOffset = 0.15 * col + 0.275;
            const yOffset = 0.3 + 0.35 * row;
            button.place({ relx: xOffset, rely: yOffset, anchor: 'center' });

            const label = new tk.Label(frame1, { image: CategoryLabel, borderwidth: 0 });
            label.image = CategoryLabel;
            label.place({ relx: xOffset, rely: yOffset + 0.10, anchor: 'center' });

            const TextforLogin = createTextImage(
                "Select Category",
                Arcade,
                40,
                "white",
                "#12022b",
                [850, 150]
            );

            this.label_name = new tk.Label(frame1, { image: TextforLogin, borderwidth: 0 });
            this.label_name.image = TextforLogin;
            this.label_name.place({ relx: 0.5, rely: 0.1, anchor: 'center' });
        });

        const Cloud1Path = photoloader(relativePath("Assets/c1.png"), 225, 45);
        const Cloud2Path = photoloader(relativePath("Assets/c2.png"), 225, 45);
        const Cloud3Path = photoloader(relativePath("Assets/c3.png"), 110, 45);
        const Cloud4Path = photoloader(relativePath("Assets/c4.png"), 110, 45);
        
        const Cloud1 = new tk.Label(frame1, { image: Cloud1Path, borderwidth: 0, bg: "#12022b" });
        Cloud1.image = Cloud1Path;
        Cloud1.place({ relx: 0.08, rely: 0.05, anchor: 'center' });
        animateLabel(Cloud1, frame1, 75, 50, 1, 0, [75, 100], [0, 500]);
        
        const Cloud2 = new tk.Label(frame1, { image: Cloud2Path, borderwidth: 0, bg: "#12022b" });
        Cloud2.image = Cloud2Path;
        Cloud2.place({ relx: 0.77, rely: 0.05, anchor: 'center' });
        animateLabel(Cloud2, frame1, 75, 50, 1, 0, [75, 100], [0, 500]);
        
        const Cloud3 = new tk.Label(frame1, { image: Cloud3Path, borderwidth: 0, bg: "#12022b" });
        Cloud3.image = Cloud3Path;
        Cloud3.place({ relx: 0.06, rely: 0.12, anchor: 'center' });
        animateLabel(Cloud3, frame1, 20, 75, 1, 0, [20, 45], [0, 500]);
        
        const Cloud4 = new tk.Label(frame1, { image: Cloud4Path, borderwidth: 0, bg: "#12022b" });
        Cloud4.image = Cloud4Path;
        Cloud4.place({ relx: 0.89, rely: 0.12, anchor: 'center' });
        animateLabel(Cloud4, frame1, 20, 75, 1, 0, [20, 45], [0, 500]);
    }

    startGame(category) {
        console.log(`Category ${category} selected`);
        for (const widget of this.master.winfo_children()) {
            widget.destroy();
        }
        new LevelSelection(this.master, category);
        playClickSound();
    }
}

class LevelSelection {
    constructor(master, category) {
        this.master = master;
        this.category = category;
        master.title("Choose Level");
        master.state('zoomed');

        const frame1 = document.createElement('div'); // Using a div as a frame
        frame1.style.position = 'absolute';
        frame1.style.left = '50%';
        frame1.style.top = '50%';
        frame1.style.transform = 'translate(-50%, -50%)';
        frame1.style.width = '100%';
        frame1.style.height = '100%';
        master.appendChild(frame1);

        SetBackground(frame1, relative_path("Assets/frame5.png"));

        const Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf");
        const Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf");

        const TitleLabel = create_text_image(
            "Choose Difficulty!",
            Arcade,
            40,
            "white",
            "#12022b",
            [1000, 150]
        );

        this.label_level = document.createElement('img');
        this.label_level.src = TitleLabel;
        this.label_level.style.borderWidth = '0';
        this.label_level.style.position = 'absolute';
        this.label_level.style.left = '50%';
        this.label_level.style.top = '10%';
        this.label_level.style.transform = 'translate(-50%, 0)';
        frame1.appendChild(this.label_level);

        // Easy Button
        const EasyButton = create_text_image(
            'Easy\n ',
            Rocabe,
            45,
            "white",
            "#73994C",
            [350, 850]
        );
        this.button_easy = document.createElement('button');
        this.button_easy.style.backgroundImage = `url(${EasyButton})`;
        this.button_easy.onclick = () => this.start_game('Easy');
        this.button_easy.style.width = '250px';
        this.button_easy.style.height = '150px';
        this.button_easy.style.border = 'none';
        this.button_easy.style.backgroundColor = '#73994C';
        this.button_easy.style.position = 'absolute';
        this.button_easy.style.left = '25%';
        this.button_easy.style.top = '47.5%';
        frame1.appendChild(this.button_easy);

        // Medium Button
        const MediumButton = create_text_image(
            'Medium\n ',
            Rocabe,
            40,
            "white",
            "#E78A33",
            [360, 850]
        );
        this.button_medium = document.createElement('button');
        this.button_medium.style.backgroundImage = `url(${MediumButton})`;
        this.button_medium.onclick = () => this.start_game('Medium');
        this.button_medium.style.width = '252px';
        this.button_medium.style.height = '150px';
        this.button_medium.style.border = 'none';
        this.button_medium.style.backgroundColor = '#E78A33';
        this.button_medium.style.position = 'absolute';
        this.button_medium.style.left = '50%';
        this.button_medium.style.top = '47.9%';
        frame1.appendChild(this.button_medium);

        // Hard Button
        const HardButton = create_text_image(
            'Hard\n ',
            Rocabe,
            48,
            "white",
            "#D74531",
            [330, 850]
        );
        this.button_hard = document.createElement('button');
        this.button_hard.style.backgroundImage = `url(${HardButton})`;
        this.button_hard.onclick = () => this.start_game('Hard');
        this.button_hard.style.width = '230px';
        this.button_hard.style.height = '150px';
        this.button_hard.style.border = 'none';
        this.button_hard.style.backgroundColor = '#D74531';
        this.button_hard.style.position = 'absolute';
        this.button_hard.style.left = '75%';
        this.button_hard.style.top = '47.5%';
        frame1.appendChild(this.button_hard);

        const Cloud1Path = photoloader(relative_path("Assets/c1.png"), 225, 45);
        const Cloud2Path = photoloader(relative_path("Assets/c2.png"), 225, 45);
        const Cloud3Path = photoloader(relative_path("Assets/c3.png"), 110, 45);
        const Cloud4Path = photoloader(relative_path("Assets/c4.png"), 110, 45);

        const Cloud1 = document.createElement('img');
        Cloud1.src = Cloud1Path;
        Cloud1.style.borderWidth = '0';
        Cloud1.style.backgroundColor = "#12022b";
        Cloud1.style.position = 'absolute';
        Cloud1.style.left = '8%';
        Cloud1.style.top = '5%';
        frame1.appendChild(Cloud1);
        animate_label(Cloud1, frame1, 75, 50, 1, 0, [75, 100], [0, 500]);

        const Cloud2 = document.createElement('img');
        Cloud2.src = Cloud2Path;
        Cloud2.style.borderWidth = '0';
        Cloud2.style.backgroundColor = "#12022b";
        Cloud2.style.position = 'absolute';
        Cloud2.style.left = '77%';
        Cloud2.style.top = '5%';
        frame1.appendChild(Cloud2);
        animate_label(Cloud2, frame1, 75, 50, 1, 0, [75, 100], [0, 500]);

        const Cloud3 = document.createElement('img');
        Cloud3.src = Cloud3Path;
        Cloud3.style.borderWidth = '0';
        Cloud3.style.backgroundColor = "#12022b";
        Cloud3.style.position = 'absolute';
        Cloud3.style.left = '6%';
        Cloud3.style.top = '12%';
        frame1.appendChild(Cloud3);
        animate_label(Cloud3, frame1, 20, 75, 1, 0, [20, 45], [0, 500]);

        const Cloud4 = document.createElement('img');
        Cloud4.src = Cloud4Path;
        Cloud4.style.borderWidth = '0';
        Cloud4.style.backgroundColor = "#12022b";
        Cloud4.style.position = 'absolute';
        Cloud4.style.left = '89%';
        Cloud4.style.top = '12%';
        frame1.appendChild(Cloud4);
        animate_label(Cloud4, frame1, 20, 75, 1, 0, [20, 45], [20, 45]);
    }

    create_text_label(parent, text, x, y, font_path, font_size) {
        const label = document.createElement('div');
        label.innerText = text;
        label.style.fontFamily = font_path;
        label.style.fontSize = font_size + 'px';
        label.style.color = "white";
        label.style.backgroundColor = "#12022b";
        label.style.position = 'absolute';
        label.style.left = `${x * 100}%`;
        label.style.top = `${y * 100}%`;
        parent.appendChild(label);
    }

    start_game(level) {
        console.log(`Starting game in ${this.category} category at ${level} level.`);
        while (this.master.firstChild) {
            this.master.removeChild(this.master.firstChild);
        }
        new MainGame(this.master, this.category, level);
        play_click_sound();
    }
}

class MainGame {
    constructor(master, category, level) {
        this.master = master;
        this.level = level;
        this.category = category;
        master.style.backgroundColor = 'grey';
        master.title = `Hangman's Gambit - ${category} ${level}`;
        master.state = 'zoomed';

        const frame1 = document.createElement('div');
        frame1.style.position = 'absolute';
        frame1.style.left = '50%';
        frame1.style.top = '50%';
        frame1.style.transform = 'translate(-50%, -50%)';
        frame1.style.width = '100%';
        frame1.style.height = '100%';
        master.appendChild(frame1);

        SetBackground(frame1, relative_path("Assets/frame4.png"));

        const Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf");
        const Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf");

        // Category Title
        const CategoryText = create_text_image(
            category,
            Arcade,
            45,
            "white",
            "#12022b",
            [1000, 100]
        );

        const load_definitions = (filename) => {
            const definitions = {};
            const file = new XMLHttpRequest();
            file.open("GET", filename, false);
            file.onreadystatechange = () => {
                if (file.readyState === 4 && file.status === 200) {
                    const lines = file.responseText.split('\n');
                    lines.forEach(line => {
                        const [word, definition] = line.split(':', 2);
                        definitions[word.toLowerCase()] = definition;
                    });
                }
            };
            file.send();
            return definitions;
        };

        this.label_category = document.createElement('img');
        this.label_category.src = CategoryText;
        this.label_category.style.borderWidth = '0';
        this.label_category.style.position = 'absolute';
        this.label_category.style.left = '50%';
        this.label_category.style.top = '10%';
        this.label_category.style.transform = 'translate(-50%, 0)';
        frame1.appendChild(this.label_category);

        // Hangman Stuff Goes here!
        const HangmanBox = document.createElement('div');
        HangmanBox.style.backgroundColor = 'grey';
        HangmanBox.style.width = '750px';
        HangmanBox.style.height = '500px';
        const square1 = photoloader(relative_path("Assets/sq1.png"), 775, 515);
        const backgroundbox = document.createElement('img');
        backgroundbox.src = square1;
        backgroundbox.style.borderWidth = '0';
        backgroundbox.style.position = 'absolute';
        backgroundbox.style.left = '50%';
        backgroundbox.style.top = '50%';
        backgroundbox.style.transform = 'translate(-50%, -50%)';
        HangmanBox.appendChild(backgroundbox);
        frame1.appendChild(HangmanBox);
        HangmanBox.style.position = 'absolute';
        HangmanBox.style.left = '42%';
        HangmanBox.style.top = '60%';

        // Key Buttons goes here!
        const HangmanKeys = document.createElement('div');
        HangmanKeys.style.backgroundColor = 'red';
        HangmanKeys.style.width = '175px';
        HangmanKeys.style.height = '500px';
        const square2 = photoloader(relative_path("Assets/sq2.png"), 187, 520);
        HangmanKeys.style.position = 'absolute';
        HangmanKeys.style.left = '80%';
        HangmanKeys.style.top = '60%';
        const backgroundkeys = document.createElement('img');
        backgroundkeys.src = square2;
        backgroundkeys.style.borderWidth = '0';
        backgroundkeys.style.position = 'absolute';
        backgroundkeys.style.left = '50%';
        backgroundkeys.style.top = '49%';
        HangmanKeys.appendChild(backgroundkeys);
        frame1.appendChild(HangmanKeys);

        if (level === 'Easy') {
            level = "1";
        } else if (level === 'Medium') {
            level = "2";
        } else if (level === 'Hard') {
            level = "3";
        }

        // choosing a random word
        this.LoadDefs = load_definitions(relative_path("Assets/WordList/" + `${category}_${level}.txt`));
        const wordlist = Object.keys(this.LoadDefs);
        this.chosenwords = wordlist[Math.floor(Math.random() * wordlist.length)].trim();
        console.log(this.chosenwords);

        const words = this.chosenwords.split(' ');

        const underscore_width = 0.06;
        const line_spacing = 0.1;
        const total_width = this.chosenwords.length * underscore_width + underscore_width;
        const start_x = (1 - total_width) / 2;
        let x = start_x;
        this.count = 0;
        this.win_count = 0;
        this.Display = [];

        // Mister Vudiddy :DD
        const Vudiddy = new Image();
        Vudiddy.src = relative_path(`Assets/Vudiddy${this.count}.png`);
        Vudiddy.onload = () => {
            const VudiddyTkImage = document.createElement('img');
            VudiddyTkImage.src = Vudiddy.src;
            VudiddyTkImage.style.borderWidth = '1';
            VudiddyTkImage.style.backgroundColor = "#9D7DE6";
            VudiddyTkImage.style.position = 'absolute';
            VudiddyTkImage.style.left = '50%';
            VudiddyTkImage.style.top = '40%';
            VudiddyTkImage.style.transform = 'translate(-50%, -50%)';
            HangmanBox.appendChild(VudiddyTkImage);
            this.VudiddyPicture = VudiddyTkImage;
        };

        words.forEach((word, line_index) => {
            x = (1 - word.length * underscore_width + underscore_width) / 2;
            const y = 0.79 + line_index * line_spacing;
            for (const char of word) {
                const Underscores = document.createElement('div');
                Underscores.innerText = "_";
                Underscores.style.fontFamily = "Helvetica";
                Underscores.style.fontSize = '25px';
                Underscores.style.backgroundColor = '#9D7DE6';
                Underscores.style.color = 'white';
                Underscores.style.position = 'absolute';
                Underscores.style.left = `${x * 100}%`;
                Underscores.style.top = `${y * 100}%`;
                HangmanBox.appendChild(Underscores);
                x += underscore_width; // Move to the next underscore position
                this.Display.push(Underscores);
            }
        });

        const listOfKeys = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const columns = 3;
        const button_width = 0.32;
        const button_height = 0.1;
        this.buttons = {};

        listOfKeys.forEach((key, idx) => {
            const Letter = create_text_image(
                key.toUpperCase(),
                Rocabe,
                20,
                "white",
                "#9D7DE6",
                [100, 100]
            );

            const row = Math.floor(idx / columns);
            const col = idx % columns;
            const x_offset = col * button_width + 0.1;
            const y_offset = row * button_height + 0.05;

            const button = document.createElement('button');
            button.style.backgroundImage = `url(${Letter})`;
            button.onclick = () => this.on_key_press(key);
            button.style.width = '25px';
            button.style.height = '25px';
            button.style.border = 'none';
            button.style.backgroundColor = '#12022b';
            button.style.position = 'absolute';
            button.style.left = `${x_offset * 100}%`;
            button.style.top = `${y_offset * 100}%`;
            HangmanKeys.appendChild(button);
            this.buttons[key] = button;
        });
    }

    on_key_press(key) {
        if (this.chosenwords.includes(key.toLowerCase())) {
            let index = 0;
            this.chosenwords.split(' ').forEach(word => {
                for (const char of word) {
                    if (key.toLowerCase() === char) {
                        this.win_count += 1;
                        play_correct_sound();
                        this.Display[index].innerText = key.toUpperCase();
                    }
                    index += 1; // move to the next line
                }
            });
            if (key in this.buttons) {
                this.buttons[key].remove();
            }
        } else {
            this.count += 1;
            play_wrong_sound();
            if (key in this.buttons) {
                this.buttons[key].remove();
            }
            if (this.count <= 6) {
                const Vudiddy = new Image();
                Vudiddy.src = relative_path(`Assets/Vudiddy${this.count}.png`);
                Vudiddy.onload = () => {
                    this.VudiddyPicture.src = Vudiddy.src;
                };
            }
        }

        // Win condition
        if (this.win_count === this.chosenwords.replace(' ', '').length) {
            while (this.master.firstChild) {
                this.master.removeChild(this.master.firstChild);
            }
            new WinWindow(this.master, this.LoadDefs, this.chosenwords, this.level);
        }
        // Lose condition
        if (this.count === 7) {
            while (this.master.firstChild) {
                this.master.removeChild(this.master.firstChild);
            }
            new LoseWindow(this.master, this.LoadDefs, this.chosenwords);
        }
    }
}

class WinWindow {
    constructor(master, LoadDefs, chosenwords, level) {
        this.master = master;
        master.title = "You Win! Hurray!!";
        master.state = 'zoomed';

        const frame1 = document.createElement('div');
        frame1.style.position = 'absolute';
        frame1.style.left = '50%';
        frame1.style.top = '50%';
        frame1.style.transform = 'translate(-50%, -50%)';
        frame1.style.width = '100%';
        frame1.style.height = '100%';
        master.appendChild(frame1);

        SetBackground(frame1, relative_path("Assets/frame4.png"));

        const Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf");
        const Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf");

        if (level === 'Easy') {
            update_user_score(50);
        } else if (level === 'Medium') {
            update_user_score(100);
        } else if (level === 'Hard') {
            update_user_score(200);
        }

        const YouWinTitle = create_text_image(
            "YOU WIN!!",
            Arcade,
            75,
            "white",
            "#12022b",
            [850, 350]
        );

        this.label_name = document.createElement('img');
        this.label_name.src = YouWinTitle;
        this.label_name.style.borderWidth = '0';
        this.label_name.style.position = 'absolute';
        this.label_name.style.left = '50%';
        this.label_name.style.top = '20%';
        this.label_name.style.transform = 'translate(-50%, 0)';
        frame1.appendChild(this.label_name);

        // Create a canvas for scrolling
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 150;
        frame1.appendChild(canvas);

        const scrollbar = document.createElement('div'); // Placeholder for scrollbar
        scrollbar.style.position = 'absolute';
        scrollbar.style.right = '0';
        scrollbar.style.height = '150px';
        frame1.appendChild(scrollbar);

        const scrollable_frame = document.createElement('div');
        scrollable_frame.style.backgroundColor = "#12022b";
        frame1.appendChild(scrollable_frame);

        // Create a text box for definitions
        const text_box = document.createElement('textarea');
        text_box.style.backgroundColor = "#12022b";
        text_box.style.color = "white";
        text_box.style.borderWidth = '0';
        text_box.style.height = '5em';
        text_box.value = `The definition of ${chosenwords}:\n${LoadDefs[chosenwords]}`;
        text_box.readOnly = true; // Make text box read-only
        scrollable_frame.appendChild(text_box);

        // Play Again Button
        const PlayAgainButton = create_text_image(
            'Play Again',
            Rocabe,
            25,
            "white",
            "green",
            [200, 150]
        );
        this.button_again = document.createElement('button');
        this.button_again.style.backgroundImage = `url(${PlayAgainButton})`;
        this.button_again.onclick = () => this.GoBackToLevel();
        this.button_again.style.width = '200px';
        this.button_again.style.height = '75px';
        this.button_again.style.backgroundColor = 'green';
        this.button_again.style.border = 'none';
        this.button_again.style.position = 'absolute';
        this.button_again.style.left = '50%';
        this.button_again.style.top = '60%';
        frame1.appendChild(this.button_again);

        // Main Menu Button
        const MainMenuButton = create_text_image(
            'Main Menu',
            Rocabe,
            25,
            "white",
            "red",
            [200, 150]
        );
        this.button_menu = document.createElement('button');
        this.button_menu.style.backgroundImage = `url(${MainMenuButton})`;
        this.button_menu.onclick = () => this.GoBackToMainMenu();
        this.button_menu.style.width = '200px';
        this.button_menu.style.height = '75px';
        this.button_menu.style.backgroundColor = 'red';
        this.button_menu.style.border = 'none';
        this.button_menu.style.position = 'absolute';
        this.button_menu.style.left = '50%';
        this.button_menu.style.top = '80%';
        frame1.appendChild(this.button_menu);
    }

    GoBackToLevel() {
        play_click_sound();
        while (this.master.firstChild) {
            this.master.removeChild(this.master.firstChild);
        }
        new SelectCategory(this.master);
    }

    GoBackToMainMenu() {
        play_click_sound();
        while (this.master.firstChild) {
            this.master.removeChild(this.master.firstChild);
        }
        new StartMenu(this.master);
    }
}

class LoseWindow {
    constructor(master, LoadDefs, chosenwords) {
        this.master = master;
        master.title("You Lost! Oh No :(");
        master.state('zoomed');
        
        const frame1 = document.createElement('div');
        frame1.style.position = 'absolute';
        frame1.style.left = '50%';
        frame1.style.top = '50%';
        frame1.style.transform = 'translate(-50%, -50%)';
        frame1.style.width = '100%';
        frame1.style.height = '100%';
        master.appendChild(frame1);

        setBackground(frame1, relativePath("Assets/frame4.png"));
        
        const Rocabe = relativePath("Assets/Fonts/RocabeTrialRegular-OGMep.ttf");
        const Arcade = relativePath("Assets/Fonts/KarmaticArcade-6Yrp1.ttf");

        const YouLostTitle = createTextImage({
            text: "YOU LOST",
            fontPath: Arcade,
            fontSize: 75,
            color: "white",
            bgColor: "#12022b",
            size: [850, 350]
        });
        
        this.labelName = document.createElement('div');
        this.labelName.style.backgroundImage = `url(${YouLostTitle})`;
        this.labelName.style.position = 'absolute';
        this.labelName.style.left = '50%';
        this.labelName.style.top = '20%';
        this.labelName.style.transform = 'translate(-50%, -50%)';
        frame1.appendChild(this.labelName);

        // Create a scrollable container
        this.scrollContainer = document.createElement('div');
        this.scrollContainer.style.width = '850px';
        this.scrollContainer.style.height = '150px';
        this.scrollContainer.style.overflow = 'auto';
        this.scrollContainer.style.backgroundColor = '#12022b';
        this.scrollContainer.style.position = 'absolute';
        this.scrollContainer.style.left = '50%';
        this.scrollContainer.style.top = '40%';
        this.scrollContainer.style.transform = 'translate(-50%, -50%)';

        // Create text content
        this.textBox = document.createElement('div');
        this.textBox.style.font = '15px Rocabe';
        this.textBox.style.color = 'white';
        this.textBox.style.padding = '10px';
        this.textBox.innerHTML = `The Word Was: ${chosenwords}<br>Definition: ${LoadDefs[chosenwords]}`;
        this.textBox.style.userSelect = 'none';
        this.scrollContainer.appendChild(this.textBox);
        frame1.appendChild(this.scrollContainer);

        // Play Again Button
        const PlayAgainButton = createTextImage({
            text: 'Play Again',
            fontPath: Rocabe,
            fontSize: 25,
            color: "white",
            bgColor: "green",
            size: [200, 150]
        });

        this.buttonAgain = document.createElement('button');
        this.buttonAgain.style.backgroundImage = `url(${PlayAgainButton})`;
        this.buttonAgain.style.width = '200px';
        this.buttonAgain.style.height = '75px';
        this.buttonAgain.style.backgroundColor = 'green';
        this.buttonAgain.style.border = 'none';
        this.buttonAgain.style.position = 'absolute';
        this.buttonAgain.style.left = '50%';
        this.buttonAgain.style.top = '60%';
        this.buttonAgain.style.transform = 'translate(-50%, -50%)';
        this.buttonAgain.onclick = () => this.GoBackToLevel();
        frame1.appendChild(this.buttonAgain);

        // Main Menu Button
        const MainMenuButton = createTextImage({
            text: 'Main Menu',
            fontPath: Rocabe,
            fontSize: 25,
            color: "white",
            bgColor: "red",
            size: [200, 150]
        });

        this.buttonMenu = document.createElement('button');
        this.buttonMenu.style.backgroundImage = `url(${MainMenuButton})`;
        this.buttonMenu.style.width = '200px';
        this.buttonMenu.style.height = '75px';
        this.buttonMenu.style.backgroundColor = 'red';
        this.buttonMenu.style.border = 'none';
        this.buttonMenu.style.position = 'absolute';
        this.buttonMenu.style.left = '50%';
        this.buttonMenu.style.top = '80%';
        this.buttonMenu.style.transform = 'translate(-50%, -50%)';
        this.buttonMenu.onclick = () => this.GoBackToMainMenu();
        frame1.appendChild(this.buttonMenu);
    }

    GoBackToLevel() {
        playClickSound();
        while (this.master.firstChild) {
            this.master.removeChild(this.master.firstChild);
        }
        new SelectCategory(this.master);
    }

    GoBackToMainMenu() {
        playClickSound();
        while (this.master.firstChild) {
            this.master.removeChild(this.master.firstChild);
        }
        new StartMenu(this.master);
    }
}

// Initialize application
const root = document.createElement('div');
document.body.appendChild(root);
const myGui = new SelectCategory(root);

