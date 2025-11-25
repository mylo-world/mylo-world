import tkinter as tk
from tkinter import ttk
from PIL import Image, ImageTk, ImageDraw, ImageFont
from tkinter import Scrollbar, Text
import os
import random
import pygame

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def relative_path(relative):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_dir, relative)

def SetBackground(master, path):
    image = Image.open(path)
    screen_width = master.winfo_screenwidth()
    screen_height = master.winfo_screenheight()
    image = image.resize((screen_width, screen_height), Image.Resampling.LANCZOS)
    photo = ImageTk.PhotoImage(image)
    background = tk.Label(master, image=photo)
    background.image = photo
    background.place(x=0, y=0, relwidth=1, relheight=1)

#Font To Image
def create_text_image(text, font_path, font_size, color, bg_color, size):
    font = ImageFont.truetype(font_path, font_size)
    image = Image.new("RGBA", size, bg_color)
    draw = ImageDraw.Draw(image)
    
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    text_x = (size[0] - text_width) // 2
    text_y = (size[1] - text_height) // 2
    
    draw.text((text_x, text_y), text, font=font, fill=color)
    return ImageTk.PhotoImage(image)


def photoloader(path, x=100, y=100):
    image = Image.open(path)
    image = image.resize((x, y), Image.Resampling.LANCZOS)
    photo = ImageTk.PhotoImage(image)
    return photo
def animate_label(label, master, x=0, y=0, x_speed=5, y_speed=0, x_bounds=(0, 800), y_bounds=(0, 600)):
    def move():
        nonlocal x, y, x_speed, y_speed
        
        # Update positions
        x += x_speed
        y += y_speed

        # Reverse direction if reaching bounds
        if x < x_bounds[0] or x > x_bounds[1]:
            x_speed = -x_speed
        if y < y_bounds[0] or y > y_bounds[1]:
            y_speed = -y_speed

        # Move the label
        label.place(x=x, y=y)
        
        # Call this function again after a short delay
        master.after(30, move)
    
    move()

#Music Section
pygame.mixer.init()
pygame.mixer.music.set_volume(0.5)

def play_click_sound():
    try:
        click_sound_path = relative_path("Assets/ClickNoise.mp3")
        click_sound = pygame.mixer.Sound(click_sound_path)
        click_sound.play()
    except pygame.error as e:
        print(f"Error playing click sound: {e}")
        
def play_correct_sound():
    try:
        correct_sound_path = relative_path("Assets/CorrectNoise.mp3")
        correct_sound = pygame.mixer.Sound(correct_sound_path)
        correct_sound.play()
    except pygame.error as e:
        print(f"Error playing correct sound: {e}")
        
def play_wrong_sound():
    try:
        wrong_sound_path = relative_path("Assets/WrongNoise.mp3")
        wrong_sound = pygame.mixer.Sound(wrong_sound_path)
        wrong_sound.play()
    except pygame.error as e:
        print(f"Error playing correct sound: {e}")

def play_music():
    try:
        pygame.mixer.music.load(relative_path("Assets/Main Ost.mp3"))
        pygame.mixer.music.play(-1)
        pygame.mixer.music.set_volume(0.5)
    except pygame.error as e:
        print(f"Error loading music: {e}")

play_music()

# Function to load scores from the text file
def load_scores(file_path="scores.txt"):
    player_scores = {}
    try:
        with open(file_path, "r") as file:
            for line in file:
                name, score = line.strip().split(":")
                player_scores[name] = int(score)
    except FileNotFoundError:
        player_scores = {}
    return player_scores

# Function to save scores to the text file
def save_scores(player_scores, file_path="scores.txt"):
    with open(file_path, "w") as file:
        for name, score in player_scores.items():
            file.write(f"{name}:{score}\n")

# Function to update a player's score
def update_user_score(points):
    global global_username
    if global_username:  # Ensure a user is logged in
        if global_username in player_scores:
            player_scores[global_username] += points
        else:
            player_scores[global_username] = points  # Initialize score if missing
        save_scores(player_scores)  # Save updated scores to the file
    else:
        print("No user is logged in.")
player_scores = load_scores()

class StartMenu:
    def __init__(self, master):
        self.master = master
        master.configure(bg='')
        master.title("Hangman's Gambit")
        master.state('zoomed')

        
        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")
        
        frame1 = tk.Frame(master)
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)
        
        SetBackground(frame1, relative_path("Assets/frame1.png"))
        
        Cloud1Path = photoloader(relative_path("Assets/c1.png"), 225, 45)
        Cloud2Path = photoloader(relative_path("Assets/c2.png"), 225, 45)
        Cloud3Path = photoloader(relative_path("Assets/c3.png"), 110, 45)
        Cloud4Path = photoloader(relative_path("Assets/c4.png"), 110, 45)
        
        Cloud1 = tk.Label(frame1, image=Cloud1Path, borderwidth=0, bg="#12022b")
        Cloud1.image = Cloud1Path
        Cloud1.place(relx=0.1, rely=0.1, anchor='center')
        animate_label(Cloud1, frame1, x=75, y=50, x_speed=1, y_speed=0, x_bounds=(75, 100), y_bounds=(0, 500))
        
        Cloud2 = tk.Label(frame1, image=Cloud2Path, borderwidth=0, bg="#12022b")
        Cloud2.image = Cloud2Path
        Cloud2.place(relx=0.75, rely=0.1, anchor='center')
        animate_label(Cloud2, frame1, x=75, y=50, x_speed=1, y_speed=0, x_bounds=(75, 100), y_bounds=(0, 500))
        
        Cloud3 = tk.Label(frame1, image=Cloud3Path, borderwidth=0, bg="#12022b")
        Cloud3.image = Cloud3Path
        Cloud3.place(relx=0.08, rely=0.17, anchor='center')
        animate_label(Cloud3, frame1, x=20, y=75, x_speed=1, y_speed=0, x_bounds=(20, 45), y_bounds=(0, 500))
        
        Cloud4 = tk.Label(frame1, image=Cloud4Path, borderwidth=0, bg="#12022b")
        Cloud4.image = Cloud4Path
        Cloud4.place(relx=0.87, rely=0.17, anchor='center')
        animate_label(Cloud4, frame1, x=20, y=75, x_speed=1, y_speed=0, x_bounds=(20, 45), y_bounds=(0, 500))
        
        title_image = create_text_image(
            text="Hangman's Gambit",
            font_path=Arcade,
            font_size=75,
            color="white",
            bg_color=("#12022b"),
            size=(1000, 100)
        )

        title_label = tk.Label(frame1, image=title_image, borderwidth=0)
        title_label.image = title_image
        title_label.place(relx=0.5, rely=0.60, anchor='center')

        def transition():
            play_click_sound()
            for widget in master.winfo_children():
                widget.destroy()
            UserLogin(master)
            
        def destroy():
            play_click_sound()
            master.destroy()

        
        startButton = create_text_image(
            text="Start Game",
            font_path=Rocabe,
            font_size=20,
            color="white",
            bg_color=("#12022b"),
            size=(850, 150)
        )

        self.button1 = tk.Button(
            frame1, 
            image=startButton, 
            command=transition, 
            width=175, height=75, 
            bg='#12022b', 
            relief="flat",
            borderwidth=0
        )
        self.button1.image = startButton
        self.button1.place(relx=0.5, rely=0.75, anchor='center')
        
        exitButton = create_text_image(
            text="Exit",
            font_path=Rocabe,
            font_size=20,
            color="white",
            bg_color=("#12022b"),
            size=(850, 150)
        )

        self.button2 = tk.Button(
            frame1, 
            image=exitButton, 
            command=destroy, 
            width=175, height=75, 
            bg='#12022b', 
            relief="flat",
            borderwidth=0
        )
        self.button2.image = exitButton
        self.button2.place(relx=0.5, rely=0.85, anchor='center')


class UserLogin:
    def __init__(self, master):
        self.master = master
        master.configure(bg='grey')
        master.title("Hangman's Gambit")
        master.state('zoomed')
        

        frame1 = tk.Frame(master)
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)
        
        SetBackground(frame1, relative_path("Assets/frame2.png"))

        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")
        TextforLogin = create_text_image(
            text="Enter Your Name",
            font_path=Arcade,
            font_size=20,
            color="white",
            bg_color=("#12022b"),
            size=(850, 350)
        )
        self.label_name = tk.Label(frame1, image=TextforLogin, borderwidth=0)
        self.label_name.image = TextforLogin
        self.label_name.place(relx=0.7, rely=0.4, anchor='center')

        self.entry_name = tk.Entry(frame1, width=30, font=("Helvetica", 12))
        self.entry_name.place(relx=0.7, rely=0.45, anchor='center')

        def transition():
            play_click_sound()
            for widget in master.winfo_children():
                widget.destroy()
            SelectCategory(master)
            
        def gotoleaderboard():
            play_click_sound()
            for widget in master.winfo_children():
                widget.destroy()
            Leaderboard(master)
        
        def login():
            global global_username
            user_name = self.entry_name.get().strip()
            if user_name:
                global_username = user_name
                if user_name not in player_scores:
                    player_scores[user_name] = 0  # Initialize score
                    save_scores(player_scores)  # Save new user to file
                transition()
            else:
                WarningLabel = create_text_image(
                    text="Please Enter Your Name",
                    font_path=relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf"),
                    font_size=15,
                    color="white",
                    bg_color=("#12022b"),
                    size=(850, 20)
                )
                Warn = tk.Label(frame1, image=WarningLabel, borderwidth=0)
                Warn.image = WarningLabel
                Warn.place(relx=0.7, rely=0.50, anchor='center')
        
        LoginButton = create_text_image(
            text="Log In",
            font_path=Rocabe,
            font_size=25,
            color="white",
            bg_color=("#12022b"),
            size=(850, 350)
        )

        self.button_login = tk.Button(
            frame1, 
            image=LoginButton, 
            command=login, 
            width=115, 
            height=75, 
            bg='#FF00FF',  
            borderwidth=0
        )
        self.button_login.image = LoginButton
        self.button_login.place(relx=0.7, rely=0.55, anchor='center')
        
        LeaderButton = create_text_image(
            text="Leaderboards",
            font_path=Rocabe,
            font_size=25,
            color="white",
            bg_color=("#12022b"),
            size=(850, 350)
        )

        self.button_login = tk.Button(
            frame1, 
            image=LeaderButton, 
            command=gotoleaderboard, 
            width=255, 
            height=75, 
            bg='#FF00FF',  
            borderwidth=0
        )
        self.button_login.image = LeaderButton
        self.button_login.place(relx=0.7, rely=0.65, anchor='center')
        
class Leaderboard:
    def __init__(self, master):
        self.master = master
        master.configure(bg='white')
        master.title("Hangman's Gambit")
        master.state('zoomed')
        frame1 = tk.Frame(master)
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)
        
        SetBackground(frame1, relative_path("Assets/frame3.png"))
        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")
        
        TitleText = create_text_image(
            text="Leaderboards",
            font_path=Arcade,
            font_size=45,
            color="white",
            bg_color=("#12022b"),
            size=(1000, 100)
        )
        self.label_category = tk.Label(frame1, image=TitleText, borderwidth=0)
        self.label_category.image=TitleText
        self.label_category.place(relx=0.5, rely=0.1, anchor='center', x= 0, y= 0)
        
        # Load scores from file
        global player_scores
        player_scores = load_scores()

        # Sort and display leaderboard
        sorted_scores = sorted(player_scores.items(), key=lambda x: x[1], reverse=True)
        cut = sorted_scores[:5]
        leaderboard_text = "Rank | Name | Score\n \n" + "\n".join(
            f"{i + 1}.".ljust(0) + f"{name}".ljust(10, ".") + f"{score}".rjust(20, ".") for i, (name, score) in enumerate(cut)
        )
        leaderboard_label = tk.Label(
            frame1, 
            text=leaderboard_text, 
            font=("Helvetica", 16), 
            justify="left", 
            bg="#12022b", 
            fg="white"
        )
        leaderboard_label.place(relx=0.5, rely=0.3, anchor='n')
        
        def transition():
            play_click_sound()
            for widget in master.winfo_children():
                widget.destroy()
            UserLogin(master)
        exitButton = create_text_image(
            text="Exit",
            font_path=Rocabe,
            font_size=20,
            color="white",
            bg_color=("#12022b"),
            size=(850, 150)
        )

        self.button2 = tk.Button(
            frame1, 
            image=exitButton, 
            command=transition, 
            width=175, height=75, 
            bg='#12022b', 
            relief="flat",
            borderwidth=0
        )
        self.button2.image = exitButton
        self.button2.place(relx=0.5, rely=0.75, anchor='center')

class SelectCategory:
    def __init__(self, master):
        self.master = master
        master.configure(bg='white')
        master.title("Hangman's Gambit")
        master.state('zoomed')
        frame1 = tk.Frame(master)
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)
        
        SetBackground(frame1, relative_path("Assets/frame3.png"))
        

        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        categories = {
            "Tech n CompSci": "Assets/1.png",
            "Natural Science": "Assets/2.png",
            "Humanities n Social Science": "Assets/3.png",
            "Business n Economics": "Assets/4.png",
            "Engineering": "Assets/5.png",
            "Health n Medicine": "Assets/6.png",
            "Academic": "Assets/7.png",
            "Study n Research": "Assets/8.png"
        }

        self.category_images = []

        for idx, (category, image_file) in enumerate(categories.items()):
            image = Image.open(relative_path(image_file)).convert("RGBA")
            image = image.resize((100, 100), Image.Resampling.LANCZOS)
            photo = ImageTk.PhotoImage(image)
            self.category_images.append(photo)
        
            if category == "Natural Science":
                category_with_newline = category.replace(" ", "\n")
            else:
                category_with_newline = category.replace(" n ", " n\n")
            textCategory = category_with_newline.center(15)

            CategoryLabel = create_text_image(
                text=f"{textCategory}",
                font_path=Rocabe,
                font_size=18,
                color="white",
                bg_color=("#12022b"),
                size=(200, 50)
            )
            
            button = tk.Button(
                frame1,
                image=photo,
                command=lambda c=category: self.start_game(c),
                borderwidth=0,
                highlightthickness=0,
                bg='#12022b',
                activebackground='#12022b'
            )

            row = idx // 4
            col = idx % 4
            x_offset = 0.15 * col + 0.275
            y_offset = 0.3 + 0.35 * row
            button.place(relx=x_offset, rely=y_offset, anchor='center')

            label = tk.Label(frame1, image=CategoryLabel, borderwidth=0)
            label.image = CategoryLabel
            label.place(relx=x_offset, rely=y_offset + 0.10, anchor='center')

            Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")
            TextforLogin = create_text_image(
                text="Select Category",
                font_path=Arcade,
                font_size=40,
                color="white",
                bg_color=("#12022b"),
                size=(850, 150)
            )

            self.label_name = tk.Label(frame1, image=TextforLogin, borderwidth=0)
            self.label_name.image = TextforLogin
            self.label_name.place(relx=0.5, rely=0.1, anchor='center')

        Cloud1Path = photoloader(relative_path("Assets/c1.png"), 225, 45)
        Cloud2Path = photoloader(relative_path("Assets/c2.png"), 225, 45)
        Cloud3Path = photoloader(relative_path("Assets/c3.png"), 110, 45)
        Cloud4Path = photoloader(relative_path("Assets/c4.png"), 110, 45)
        
        Cloud1 = tk.Label(frame1, image=Cloud1Path, borderwidth=0, bg="#12022b")
        Cloud1.image = Cloud1Path
        Cloud1.place(relx=0.08, rely=0.05, anchor='center')
        animate_label(Cloud1, frame1, x=75, y=50, x_speed=1, y_speed=0, x_bounds=(75, 100), y_bounds=(0, 500))
        
        Cloud2 = tk.Label(frame1, image=Cloud2Path, borderwidth=0, bg="#12022b")
        Cloud2.image = Cloud2Path
        Cloud2.place(relx=0.77, rely=0.05, anchor='center')
        animate_label(Cloud2, frame1, x=75, y=50, x_speed=1, y_speed=0, x_bounds=(75, 100), y_bounds=(0, 500))
        
        Cloud3 = tk.Label(frame1, image=Cloud3Path, borderwidth=0, bg="#12022b")
        Cloud3.image = Cloud3Path
        Cloud3.place(relx=0.06, rely=0.12, anchor='center')
        animate_label(Cloud3, frame1, x=20, y=75, x_speed=1, y_speed=0, x_bounds=(20, 45), y_bounds=(0, 500))
        
        Cloud4 = tk.Label(frame1, image=Cloud4Path, borderwidth=0, bg="#12022b")
        Cloud4.image = Cloud4Path
        Cloud4.place(relx=0.89, rely=0.12, anchor='center')
        animate_label(Cloud4, frame1, x=20, y=75, x_speed=1, y_speed=0, x_bounds=(20, 45), y_bounds=(0, 500))
        
    def start_game(self, category):
        print(f"Category {category} selected")
        for widget in self.master.winfo_children():
            widget.destroy()
        LevelSelection(self.master, category)
        play_click_sound()


class LevelSelection:
    def __init__(self, master, category):
        self.master = master
        self.category = category
        master.title("Choose Level")
        master.state('zoomed')

        frame1 = tk.Frame(master)
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)
        
        SetBackground(frame1, relative_path("Assets/frame5.png"))

        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")
        
        TitleLabel = create_text_image(
            text="Choose Difficulty!",
            font_path=Arcade,
            font_size=40,
            color="white",
            bg_color=("#12022b"),
            size=(1000, 150)
        )
        self.label_level = tk.Label(
            frame1,
            image=TitleLabel,
            borderwidth= 0
        )
        self.label_level.image = TitleLabel
        self.label_level.place(relx=0.5, rely=0.1, anchor='center')

        # Easy Button
        EasyButton = create_text_image(
            text='Easy\n ',
            font_path=Rocabe,
            font_size=45, 
            color="white",
            bg_color="#73994C",
            size=(350, 850) 
        ) 
        self.button_easy = tk.Button(
            frame1,
            image=EasyButton,
            command=lambda: self.start_game('Easy'),
            width=250,
            height=150,
            relief="flat", 
            borderwidth=0,
            bg='#73994C'
        )
        self.button_easy.image = EasyButton
        self.button_easy.place(relx=0.25, rely=0.475, anchor="center")  

        # Medium Button
        MediumButton = create_text_image(
            text='Medium\n ',
            font_path=Rocabe,
            font_size=40,
            color="white",
            bg_color="#E78A33",
            size=(360, 850)
        )
        self.button_medium = tk.Button(
            frame1,
            image=MediumButton,
            command=lambda: self.start_game('Medium'),
            width=252,
            height=150,
            relief="flat", 
            borderwidth=0,
            bg='#E78A33'
        )
        self.button_medium.image = MediumButton
        self.button_medium.place(relx=0.5, rely=0.479, anchor='center')  

        # Hard Button
        HardButton = create_text_image(
            text='Hard\n ',
            font_path=Rocabe,
            font_size=48,
            color="white",
            bg_color="#D74531",
            size=(330, 850)
        )
        self.button_hard = tk.Button(
            frame1,
            image=HardButton,
            command=lambda: self.start_game('Hard'),
            width=230,
            height=150, 
            relief="flat",
            borderwidth=0,
            bg='#D74531'
        )
        self.button_hard.image = HardButton
        self.button_hard.place(relx=0.75, rely=0.475, anchor='center')

        Cloud1Path = photoloader(relative_path("Assets/c1.png"), 225, 45)
        Cloud2Path = photoloader(relative_path("Assets/c2.png"), 225, 45)
        Cloud3Path = photoloader(relative_path("Assets/c3.png"), 110, 45)
        Cloud4Path = photoloader(relative_path("Assets/c4.png"), 110, 45)
        
        Cloud1 = tk.Label(frame1, image=Cloud1Path, borderwidth=0, bg="#12022b")
        Cloud1.image = Cloud1Path
        Cloud1.place(relx=0.08, rely=0.05, anchor='center')
        animate_label(Cloud1, frame1, x=75, y=50, x_speed=1, y_speed=0, x_bounds=(75, 100), y_bounds=(0, 500))
        
        Cloud2 = tk.Label(frame1, image=Cloud2Path, borderwidth=0, bg="#12022b")
        Cloud2.image = Cloud2Path
        Cloud2.place(relx=0.77, rely=0.05, anchor='center')
        animate_label(Cloud2, frame1, x=75, y=50, x_speed=1, y_speed=0, x_bounds=(75, 100), y_bounds=(0, 500))
        
        Cloud3 = tk.Label(frame1, image=Cloud3Path, borderwidth=0, bg="#12022b")
        Cloud3.image = Cloud3Path
        Cloud3.place(relx=0.06, rely=0.12, anchor='center')
        animate_label(Cloud3, frame1, x=20, y=75, x_speed=1, y_speed=0, x_bounds=(20, 45), y_bounds=(0, 500))
        
        Cloud4 = tk.Label(frame1, image=Cloud4Path, borderwidth=0, bg="#12022b")
        Cloud4.image = Cloud4Path
        Cloud4.place(relx=0.89, rely=0.12, anchor='center')
        animate_label(Cloud4, frame1, x=20, y=75, x_speed=1, x_bounds=(20, 45), y_bounds=(20, 45))

    def create_text_label(self, parent, text, x, y, font_path, font_size):
        label = tk.Label(parent, text=text, font=(font_path, font_size), fg="white", bg="#12022b")
        label.place(relx=x, rely=y, anchor='center')

    def start_game(self, level):
        print(f"Starting game in {self.category} category at {level} level.")
        for widget in self.master.winfo_children():
            widget.destroy()
        MainGame(self.master, self.category, level)
        play_click_sound()

class MainGame:
    def __init__(self, master, category, level):
        self.master = master
        self.level = level
        self.category = category
        master.configure(bg='grey')
        master.title(f"Hangman's Gambit - {category} {level}")
        master.state('zoomed')
        
        frame1 = tk.Frame(master)
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)

        SetBackground(frame1, relative_path("Assets/frame4.png"))
        
        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")
        
        #Category Title
        CategoryText = create_text_image(
            text=f"{category}",
            font_path=Arcade,
            font_size=45,
            color="white",
            bg_color=("#12022b"),
            size=(1000, 100)
        )
        def load_definitions(filename):
            definitions = {}
            with open(filename, 'r') as file:
                for line in file:
                    word, definition = line.strip().split(':', 1)
                    definitions[word.lower()] = definition
            return definitions

        self.label_category = tk.Label(frame1, image=CategoryText, borderwidth=0)
        self.label_category.image=CategoryText
        self.label_category.place(relx=0.5, rely=0.1, anchor='center', x= 0, y= 0)
        
        #Hangman Stuff Goes here!
        HangmanBox = tk.Frame(frame1, bg='grey', width=750, height=500)
        square1 = photoloader(relative_path("Assets/sq1.png"), 775, 515)
        backgroundbox = tk.Label(HangmanBox, image=square1, borderwidth=0)
        backgroundbox.image = square1
        backgroundbox.place(relx=0.5, rely=0.5, anchor='center')
        # SetBackground(HangmanBox, relative_path("Assets/sq1.png"))
        HangmanBox.place(relx=0.42, rely=0.6, anchor='center')
        
        #Key Buttons goes here!
        HangmanKeys = tk.Frame(frame1, bg='red', width=175, height=500)
        square2 = photoloader(relative_path("Assets/sq2.png"), 187, 520)
        HangmanKeys.place(relx=0.80, rely=0.6, anchor='center')
        backgroundkeys = tk.Label(HangmanKeys, image=square2, borderwidth=0)
        backgroundkeys.image = square2
        backgroundkeys.place(relx=0.5, rely=0.49, anchor='center')
        
        
        if level == 'Easy':
            level = "1"
        elif level == 'Medium':
            level = "2"
        elif level == 'Hard':
            level = "3"
        
        #choosing a random word
        self.LoadDefs = load_definitions(relative_path("Assets/WordList/"+f"{category}_{level}.txt"))
        wordlist = list(self.LoadDefs.keys())  
        self.chosenwords = random.choice(wordlist)
        self.chosenwords = self.chosenwords.strip()
        print(self.chosenwords)
        
        words = self.chosenwords.split(' ')

        underscore_width = 0.06
        line_spacing = 0.1
        total_width = len(self.chosenwords) * underscore_width + underscore_width
        start_x = (1 - total_width) / 2
        x = start_x
        self.count = 0
        self.win_count = 0
        self.Display = []
        
        #Mister Vudiddy :DD
        Vudiddy = Image.open(relative_path(f"Assets/Vudiddy{self.count}.png")).convert("RGBA")
        Vudiddy = Vudiddy.resize((350, 350), Image.Resampling.LANCZOS)
        VudiddyTkImage = ImageTk.PhotoImage(Vudiddy)

        self.VudiddyPicture = tk.Label(
            HangmanBox,
            image=VudiddyTkImage,
            borderwidth=1,
            bg="#9D7DE6"
        )
        self.VudiddyPicture.image = VudiddyTkImage
        self.VudiddyPicture.place(relx=0.5, rely=0.4, anchor='center')
        
        for line_index, word in enumerate(words):
            x = (1 - len(word) * underscore_width + underscore_width) / 2
            y = 0.79 + line_index * line_spacing
            for char in word:
                Underscores = tk.Label(
                    HangmanBox,
                    text="_",
                    font=("Helvetica", 25),
                    bg='#9D7DE6',
                    fg='white',
                    justify='center',
                    anchor='center',
                )
                Underscores.place(relx=x, rely=y, anchor='center')
                x += underscore_width  # Move to the next underscore position
                self.Display.append(Underscores)
            
        listOfKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                      'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
                      'u', 'v', 'w', 'x', 'y', 'z']
        
        columns = 3
        button_width = 0.32
        button_height = 0.1
        self.buttons = {}

        for idx, key in enumerate(listOfKeys):
            Letter = create_text_image(
                text=key.upper(),
                font_path=Rocabe,
                font_size=20,
                color="white",
                bg_color="#9D7DE6",
                size=(100, 100)
            )


            row = idx // columns
            col = idx % columns
            x_offset = col * button_width + 0.1
            y_offset = row * button_height + 0.05

            button = tk.Button(
                HangmanKeys,
                image=Letter,
                command=lambda k=key: on_key_press(k),
                width=25,
                height=25,
                borderwidth=0,
                highlightthickness=0,
                bg='#12022b',
                activebackground='#12022b'
            )
            button.image = Letter
            button.place(relx=x_offset, rely=y_offset)
            
            self.buttons[key] = button
            
                
        def on_key_press(key):
            if key.lower() in self.chosenwords:
                index = 0
                for word in self.chosenwords.split(' '): #split, trs di proses masing2 kata
                    for char in word: #tiap karakter di kata
                        if key.lower() == char:
                            self.win_count += 1
                            play_correct_sound()
                            self.Display[index].config(text=key.upper())
                        index += 1 #move to the next line
                if key in self.buttons:
                    self.buttons[key].destroy()
            else:
                self.count += 1
                play_wrong_sound()
                if key in self.buttons:
                    self.buttons[key].destroy()
                if self.count <= 6:
                    Vudiddy = Image.open(relative_path(f"Assets/Vudiddy{self.count}.png")).convert("RGBA")
                    Vudiddy = Vudiddy.resize((350, 350), Image.Resampling.LANCZOS)
                    VudiddyTkImage = ImageTk.PhotoImage(Vudiddy)
                    
                    self.VudiddyPicture.config(image=VudiddyTkImage)
                    self.VudiddyPicture.image = VudiddyTkImage

            #Win con
            if self.win_count == len(self.chosenwords.replace(' ', '')):
                for widget in self.master.winfo_children():
                    widget.destroy()
                WinWindow(self.master, self.LoadDefs, self.chosenwords, self.level)
            #lose con
            if self.count == 7:
                for widget in self.master.winfo_children():
                    widget.destroy()
                LoseWindow(self.master, self.LoadDefs, self.chosenwords)
                
                
class WinWindow:
    def __init__(self, master, LoadDefs, chosenwords, level):
        self.master = master
        master.title("You Win! Hurray!!")
        master.state('zoomed')
        
        frame1 = tk.Frame(master)                                                                                                                          
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)

        SetBackground(frame1, relative_path("Assets/frame4.png"))
        
        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")
        
        if level == 'Easy':
            update_user_score(50)
        elif level == 'Medium':
            update_user_score(100)
        elif level == 'Hard':
            update_user_score(200)
        
        YouWinTitle = create_text_image(
            text="YOU WIN!!",
            font_path=Arcade,
            font_size=75,
            color="white",
            bg_color=("#12022b"),
            size=(850, 350)
        )
        self.label_name = tk.Label(frame1, image=YouWinTitle, borderwidth=0)
        self.label_name.image = YouWinTitle
        self.label_name.place(relx=0.5, rely=0.2, anchor='center')

        canvas = tk.Canvas(frame1, width=600, height=150, borderwidth=0, highlightthickness=0, bg="#12022b") 
        scrollbar = ttk.Scrollbar(frame1, orient="vertical", command=canvas.yview) 
        scrollable_frame = tk.Frame(canvas, bg="#12022b") 
        scrollable_frame.bind( 
            "<Configure>", 
            lambda e: canvas.configure( 
                scrollregion=canvas.bbox("all") 
            ) 
        ) 
        
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw") 
        canvas.configure(yscrollcommand=scrollbar.set) 
        
        text_box = tk.Text( 
            scrollable_frame, wrap=tk.WORD, 
            font=(Rocabe, 15), bg="#12022b", fg="white", borderwidth=0 
        ) 
        text_box.tag_configure("center", justify='center') 
        text_box.insert(tk.END, f"The Word Was {chosenwords}\n{LoadDefs[chosenwords]}", "center") 
        text_box.config(state=tk.DISABLED) # Make text box read-only 
        text_box.pack(side=tk.LEFT, fill=tk.BOTH, expand=True) 
        
        canvas.place(relx=0.5, rely=0.4, anchor='center') 
        scrollbar.place(relx=0.75, rely=0.4, anchor='center',height=150)
        
        PlayAgainButton = create_text_image(
            text='Play Again',
            font_path=Rocabe,
            font_size=25,
            color="white",
            bg_color=("green"),
            size=(200, 150)
        )
        self.button_again = tk.Button(
            frame1,
            image=PlayAgainButton,
            command=self.GoBackToLevel,
            width=200,
            height=75,
            bg='green', 
            relief="flat", 
            borderwidth=0
        )
        self.button_again.image = PlayAgainButton
        self.button_again.place(relx=0.5, rely=0.6, anchor='center')
        
        MainMenuButton = create_text_image(
            text='Main Menu',
            font_path=Rocabe,
            font_size=25,
            color="white",
            bg_color=("red"),
            size=(200, 150)
        )
        self.button_menu = tk.Button(
            frame1,
            image=MainMenuButton,
            command=self.GoBackToMainMenu,
            width=200,
            height=75,
            bg='red', 
            relief="flat", 
            borderwidth=0
        )
        self.button_menu.image = MainMenuButton
        self.button_menu.place(relx=0.5, rely=0.8, anchor='center')

    def GoBackToLevel(self):
        play_click_sound()  
        for widget in self.master.winfo_children():
            widget.destroy()
        SelectCategory(self.master)
        
    def GoBackToMainMenu(self):
        play_click_sound()
        for widget in self.master.winfo_children():
            widget.destroy()
        StartMenu(self.master)
        
class LoseWindow:
    def __init__(self, master, LoadDefs, chosenwords):
        self.master = master
        master.title("You Lost! Oh No :(")
        master.state('zoomed')
        
        frame1 = tk.Frame(master)
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)

        SetBackground(frame1, relative_path("Assets/frame4.png"))
        
        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")

        YouWinTitle = create_text_image(
            text="YOU LOST",
            font_path=Arcade,
            font_size=75,
            color="white",
            bg_color=("#12022b"),
            size=(850, 350)
        )
        self.label_name = tk.Label(frame1, image=YouWinTitle, borderwidth=0)
        self.label_name.image = YouWinTitle
        self.label_name.place(relx=0.5, rely=0.2, anchor='center')

        # canvas = tk.Canvas(frame1, width=600, height=75, borderwidth=0, highlightthickness=0, bg="#12022b") 
        # scrollbar = ttk.Scrollbar(frame1, orient="vertical", command=canvas.yview) 
        # style=ttk.Style()
        # style.configure("Vertical.TScrollbar", background="#12022b", troughcolor="#12022b", arrowcolor="white") 
        # scrollable_frame = tk.Frame(canvas, bg="#12022b")
        
        # scrollable_frame.bind( 
        #     "<Configure>", 
        #     lambda e: canvas.configure( 
        #         scrollregion=canvas.bbox("all") 
        #         ) 
        # ) 
        # canvas.create_window((0, 0), window=scrollable_frame, anchor="nw") 
        # canvas.configure(yscrollcommand=scrollbar.set)  
        
        # text_box = tk.Text( 
        #     scrollable_frame, wrap=tk.WORD, 
        #     font=("Rocabe", 15), bg="#12022b", fg="white", borderwidth=0 
        # ) 
        # text_box.tag_configure("center", justify='center') 
        # text_box.insert(tk.END, f"The Word Was {chosenwords}\n{LoadDefs[chosenwords]}", "center") 
        # text_box.config(state=tk.DISABLED) # Make text box read-only 
        # text_box.pack(side=tk.LEFT, fill=tk.BOTH, expand=True) 
        # Definitions = tk.Label(scrollable_frame, borderwidth=0, bg="#12022b")
        # Definitions.pack()

        # canvas.place(relx=0.45, rely=0.4, anchor='center') 
        # scrollbar.place(relx=0.8, rely=0.4, anchor='center', height=75)

        # canvas = tk.Canvas(frame1, width=600, height=150, borderwidth=0, highlightthickness=0, bg="#12022b") 
        # scrollbar = tk.Scrollbar(frame1, orient="vertical", command=canvas.yview) 
        # style = ttk.Style()
        # style.configure("Vertical.TScrollbar", background="#12022b", troughcolor="#12022b", arrowcolor="white") 
        # scrollable_frame = tk.Frame(canvas, bg="#12022b")
        
        # scrollable_frame.bind( 
        #     "<Configure>", 
        #     lambda e: canvas.configure( 
        #         scrollregion=canvas.bbox("all") 
        #     ) 
        # ) 
        # canvas.create_window((0, 0), window=scrollable_frame, anchor="nw") 
        # canvas.configure(yscrollcommand=scrollbar.set)  
        
        # # Create a text box for definitions
        # text_box = tk.Text( 
        #     scrollable_frame, wrap=tk.WORD, 
        #     font=("Rocabe", 15), bg="#12022b", fg="white", borderwidth=0, height=5
        # ) 
        # text_box.tag_configure("center", justify='center') 
        # text_box.insert(tk.END, f"The Word Was: {chosenwords}\nDefinition: {LoadDefs[chosenwords]}", "center") 
        # text_box.config(state=tk.DISABLED)  # Make text box read-only 
        # text_box.pack(side=tk.LEFT, fill=tk.BOTH, expand=True) 

        # # Place the canvas and scrollbar
        # canvas.place(relx=0.5, rely=0.4, anchor='center') 
        # scrollbar.place(relx=0.8, rely=0.4, anchor='center', height=150)

        # PlayAgainButton = create_text_image(
        #     text='Play Again',
        #     font_path=Rocabe,
        #     font_size=25,
        #     color="white",
        #     bg_color=("green"),
        #     size=(200, 150)
        # )
        # self.button_again = tk.Button(
        #     frame1,
        #     image=PlayAgainButton,
        #     command=self.GoBackToLevel,
        #     width=200,
        #     height=75,
        #     bg='green', 
        #     relief="flat", 
        #     borderwidth=0
        # )
        # self.button_again.image = PlayAgainButton
        # self.button_again.place(relx=0.5, rely=0.6, anchor='center')

        text_frame = tk.Frame(frame1, width=800, height=200, bg="#12022b") 
        text_frame.place(relx=0.5, rely=0.4, anchor='center') 
        canvas = tk.Canvas(text_frame, bg="#12022b", width=800, height=200) 
        scrollbar = ttk.Scrollbar(text_frame, orient="vertical", command=canvas.yview) 
        scrollbar.pack(side="right", fill="y") 
        scrollable_frame = tk.Frame(canvas, bg="#12022b") 
        scrollable_frame.bind( "<Configure>", lambda e: canvas.configure( scrollregion=canvas.bbox("all") ) ) 
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw") 
        canvas.pack(side="left", fill="both", expand=True) 
        canvas.configure(yscrollcommand=scrollbar.set) 
        text_widget = tk.Text(scrollable_frame, wrap="word", font=(Rocabe, 15), bg="#12022b", fg="white", bd=0) 
        text_widget.insert(tk.END, f"The Word Was {chosenwords}\n{LoadDefs[chosenwords]}") 
        text_widget.config(state=tk.DISABLED) # Make text box read-only 
        text_widget.pack(fill="both", expand=True)
        
        MainMenuButton = create_text_image(
            text='Main Menu',
            font_path=Rocabe,
            font_size=25,
            color="white",
            bg_color=("red"),
            size=(200, 150)
        )
        self.button_menu = tk.Button(
            frame1,
            image=MainMenuButton,
            command=self.GoBackToMainMenu,
            width=200,
            height=75,
            bg='red', 
            relief="flat", 
            borderwidth=0
        )
        self.button_menu.image = MainMenuButton
        self.button_menu.place(relx=0.5, rely=0.8, anchor='center')

    def GoBackToLevel(self):
        play_click_sound()
        for widget in self.master.winfo_children():
            widget.destroy()
        SelectCategory(self.master)
        
    def GoBackToMainMenu(self):
        play_click_sound()
        for widget in self.master.winfo_children():
            widget.destroy()
        StartMenu(self.master)
         
root = tk.Tk()
my_gui = SelectCategory(root)
root.mainloop()