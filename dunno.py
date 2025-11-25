import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk, ImageDraw, ImageFont
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

def create_text_image(text, font_path, font_size, color, bg_color, size):
    font = ImageFont.truetype(font_path, font_size)
    image = Image.new("RGBA", size, bg_color)
    draw = ImageDraw.Draw(image)
    
    # Measure text size using textbbox
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    text_x = (size[0] - text_width) // 2
    text_y = (size[1] - text_height) // 2
    
    draw.text((text_x, text_y), text, font=font, fill=color)
    return ImageTk.PhotoImage(image)

pygame.mixer.init()
pygame.mixer.music.set_volume(0.5)

def play_click_sound():
    try:
        click_sound_path = relative_path("Assets/mouse-click-sound-233951.mp3")
        click_sound = pygame.mixer.Sound(click_sound_path)
        click_sound.play()
    except pygame.error as e:
        print(f"Error playing click sound: {e}")

def play_music():
    try:
        pygame.mixer.music.load(relative_path("Assets/main ost.mp3"))
        pygame.mixer.music.play(-1)
    except pygame.error as e:
        print(f"Error loading music: {e}")

play_music()
play_click_sound()

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

        
        startButton = create_text_image(
            text="Start Game",
            font_path=Rocabe,
            font_size=20,
            color="white",
            bg_color=("#12022b"),
            size=(850, 350)
        )

        self.button1 = tk.Button(frame1, image=startButton, command=transition, width=175, height=100, bg='#12022b', relief="flat", borderwidth=0)
        self.button1.image = startButton
        self.button1.place(relx=0.5, rely=0.75, anchor='center')
         

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
        def login():
            user_name = self.entry_name.get()
            if user_name:
                messagebox.showinfo("Login", f"Welcome, {user_name}!")
                transition()
            else:
                messagebox.showwarning("Login", "Please enter your name!")
            

        
        LoginButton = create_text_image(
            text="Log In",
            font_path=Rocabe,
            font_size=20,
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

    def login_and_play_sound(self):
        play_click_sound()  # Play sound
        self.login() 

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
            play_click_sound()

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

    def start_game(self, category):
        print(f"Category {category} selected")
        messagebox.showinfo("Category Selected", f"Starting game with category: {category}")
        play_click_sound()
        for widget in self.master.winfo_children():
            widget.destroy()
        LevelSelection(self.master, category)

class LevelSelection:
    def __init__(self, master, category):
        self.master = master
        self.category = category
        master.title("Choose Level")
        master.state('zoomed')

        frame1 = tk.Frame(master)
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)
        
        SetBackground(frame1, relative_path("Assets/frame3.png"))

        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")
        
        TitleLabel = create_text_image(
            text=f"Choose Difficulty!",
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
            text='Easy',
            font_path=Rocabe,
            font_size=25,
            color="white",
            bg_color=("green"),
            size=(200, 150)
        )
        self.button_easy = tk.Button(
            frame1,
            image=EasyButton,
            command=lambda: self.start_game('easy'),
            width=150,
            height=75,
            bg='green', 
            relief="flat", 
            borderwidth=0
        )
        self.button_easy.image = EasyButton
        self.button_easy.place(relx=0.5, rely=0.3, anchor='center')
        
        #Medium Button
        MediumButton = create_text_image(
            text='Medium',
            font_path=Rocabe,
            font_size=25,
            color="white",
            bg_color=("yellow"),
            size=(200, 150)
        )
        self.button_medium = tk.Button(
            frame1,
            image=MediumButton,
            command=lambda: self.start_game('medium'),
            width=150,
            height=75,
            bg='yellow', 
            relief="flat", 
            borderwidth=0
        )
        self.button_medium.image = MediumButton
        self.button_medium.place(relx=0.5, rely=0.5, anchor='center')
        
        #Hard Button
        HardButton = create_text_image(
            text='Hard',
            font_path=Rocabe,
            font_size=25,
            color="white",
            bg_color=("red"),
            size=(200, 150)
        )
        self.button_hard = tk.Button(
            frame1,
            image=HardButton,
            command=lambda: self.start_game('hard'),
            width=150,
            height=75,
            bg='red', 
            relief="flat", 
            borderwidth=0
        )
        self.button_hard.image = HardButton
        self.button_hard.place(relx=0.5, rely=0.7, anchor='center')


    def start_game(self, level):
        print(f"Starting game in {self.category} category at {level} level.")
        messagebox.showinfo("Difficulty Selected", f"Starting game in {self.category} category at {level} difficulty.")
        play_click_sound()
        for widget in self.master.winfo_children():
            widget.destroy()
        MainGame(self.master, self.category, level)



class MainGame:
    def __init__(self, master, category, level):
        self.master = master
        master.configure(bg='grey')
        master.title(f"Hangman's Gambit - {category} {level}")
        master.state('zoomed')
        
        frame1 = tk.Frame(master)
        frame1.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)

        SetBackground(frame1, relative_path("Assets/frame4.png"))
        
        Rocabe = relative_path("Assets/Fonts/RocabeTrialRegular-OGMep.ttf")
        Arcade = relative_path("Assets/Fonts/KarmaticArcade-6Yrp1.ttf")
        
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
        HangmanBox.place(relx=0.40, rely=0.6, anchor='center')
        
        #Key Buttons goes here!
        HangmanKeys = tk.Frame(frame1, bg='red', width=175, height=500)
        HangmanKeys.place(relx=0.78, rely=0.6, anchor='center')
        
        self.label_placeholder = tk.Label(HangmanBox, text="Game Logic Here", font=("Helvetica", 18), bg='grey', fg='white')
        self.label_placeholder.place(relx=0.5, rely=0.5, anchor='center')
        
        self.Keys_placeholder = tk.Label(HangmanKeys, text="Keys Here", font=("Helvetica", 18), bg='grey', fg='white')
        self.Keys_placeholder.place(relx=0.5, rely=0.5, anchor='center')
        
        word_definitions = load_definitions(r'C:\Users\LENOVO\VSCode Python\Personal\Projects\words4Hangman')
        word_list = list(word_definitions.keys())  

        chosen_word = random.choice(word_list)
        chosen_word.strip('\n')
        count = 0
        win_count = 0
        x = 0.2
        
        run = True
        # while run:
        for i in range(len(chosen_word)):
            x += 0.05
            Garis =tk.Label(HangmanBox, 
                        text="_", 
                        font=("Helvetica", 18), 
                        bg='grey', 
                        fg='white'
                )
            Garis.place(relx= x, rely=0.8, anchor='center')

root = tk.Tk()
my_gui = StartMenu(root)
root.mainloop()