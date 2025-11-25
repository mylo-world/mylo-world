import tkinter as tk
from PIL import Image, ImageTk, ImageDraw, ImageFont
from tkinter import Scrollbar
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
    except pygame.error as e:
        print(f"Error loading music: {e}")

def create_moving_clouds(master, cloud_files, positions, delay=50):
    # Load the cloud images
    clouds = [ImageTk.PhotoImage(Image.open(cloud)) for cloud in cloud_files]

    # Create labels for each cloud and place them initially
    labels = [tk.Label(master, image=clouds[i]) for i in range(len(clouds))]
    for i, label in enumerate(labels):
        label.place(x=positions[i]["x"], y=positions[i]["y"])

    # Animation function
    def animate():
        for i, label in enumerate(labels):
            pos = positions[i]

            # Update cloud position based on its direction
            pos["x"] += pos["direction"] * 2

            # Reverse direction if the cloud reaches its range limit
            if abs(pos["x"] - pos["initial_x"]) >= pos["range"]:
                pos["direction"] *= -1

            # Move the cloud label to the updated position
            label.place(x=pos["x"], y=pos["y"])

        # Schedule the next animation frame
        master.after(delay, animate)

    # Start the animation loop
    animate()

    # Return a function to stop animation if needed (you can extend this to cancel the `after` call)
    def stop_animation():
        for label in labels:
            label.place_forget()

    return stop_animation


play_music()

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

        # Set the background image
        SetBackground(frame1, relative_path("Assets/frame1.png"))

        cloud_files = [
            relative_path("Assets/c1.png"),
            relative_path("Assets/c2.png"),
            relative_path("Assets/c3.png"),
            relative_path("Assets/c4.png"),
        ]

        cloud_positions = [
            {"x": 20, "y": 50, "direction": 1, "range": 200, "initial_x": 20},
            {"x": 600, "y": 100, "direction": -1, "range": 300, "initial_x": 600},
            {"x": 200, "y": 200, "direction": 1, "range": 150, "initial_x": 200},
            {"x": 700, "y": 300, "direction": -1, "range": 250, "initial_x": 700},
        ]

        # Add moving clouds
        self.stop_clouds = create_moving_clouds(frame1, cloud_files, cloud_positions, delay=50)

        # Title image
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

        # def transition():
        #     play_click_sound()
        #     for widget in master.winfo_children():
        #         widget.destroy()
        #     UserLogin(master)

        # Start button
        startButton = create_text_image(
            text="Start Game",
            font_path=Rocabe,
            font_size=20,
            color="white",
            bg_color=("#12022b"),
            size=(850, 350)
        )

        self.button1 = tk.Button(frame1, image=startButton, width=175, height=100, bg='#12022b', relief="flat", borderwidth=0)
        self.button1.image = startButton
        self.button1.place(relx=0.5, rely=0.75, anchor='center')

root = tk.Tk()
my_gui = StartMenu(root)
root.mainloop()
