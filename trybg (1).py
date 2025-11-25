import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
import os
from tkinter import font

# Get the base directory of the script
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

class StartMenu:
    def __init__(self, master):
        self.master = master
        master.configure(bg='grey')
        master.title("Hangman's Gambit")
        master.state('zoomed')

        SetBackground(master, relative_path("Assets/frame1.png"))

        font_path = r"C:\Users\LOQ\Python latihan\college studies\PROJECT\Assets\KarmaticArcade-6Yrp1.ttf" 
        font_name = os.path.basename(font_path).split('.')[0] 
        custom_font = font.Font(family=font_name, size=64) 
        tk.Tk.report_callback_exception = self
        self.custom_label = tk.Label(master, text='Hangman\'s Gambit', font=custom_font, bg='#12022B', fg='white') 
        self.custom_label.place(relx=0.5, rely=0.6, anchor='center')

        def transition():
            master.destroy()
            new_root = tk.Tk()
            UserLogin(new_root)

        self.button1 = tk.Button(master, text='Start', command=transition, width=25, height=3, bg='#FF00FF', fg='white', borderwidth=10)
        self.button1.place(relx=0.5, rely=0.75, anchor='center')

class UserLogin:
    def __init__(self, master):
        self.master = master
        master.configure(bg='grey')
        master.title("Hangman's Gambit")
        master.state('zoomed')

        SetBackground(master, relative_path("Assets/frame2.png"))

        self.label_name = tk.Label(master, text="Enter Your Name:", font=("Helvetica", 14), bg='grey', fg='white')
        self.label_name.place(relx=0.7, rely=0.4, anchor='center')

        self.entry_name = tk.Entry(master, width=30, font=("Helvetica", 12))
        self.entry_name.place(relx=0.7, rely=0.45, anchor='center')

        def login(): 
            user_name = self.entry_name.get() 
            if user_name: 
                messagebox.showinfo("Login", f"Welcome, {user_name}!") 
                master.destroy() 
                new_root = tk.Tk() 
                SelectCategory(new_root) 
            else: 
                messagebox.showwarning("Login", "Please enter your name!")

        def transition():
            master.destroy()
            new_root = tk.Tk()
            SelectCategory(new_root)

        self.button_login = tk.Button(master, text='Log In', command=transition, width=15, height=2, bg='#FF00FF', fg='white', borderwidth=10)
        self.button_login.place(relx=0.7, rely=0.55, anchor='center')

class SelectCategory:
    def __init__(self, master):
        self.master = master
        master.configure(bg='white')
        master.title("Hangman's Gambit")
        master.state('zoomed')
        SetBackground(master, relative_path("Assets/frame3.png"))

        categories = {
            "Tech & Computer Science": "Assets/Copy of 1.png",
            "Natural Science": "Assets/Copy of 2.png",
            "Humanities & Social Science": "Assets/Copy of 3.png",
            "Business & Economics": "Assets/Copy of 4.png",
            "Engineering": "Assets/Copy of 5.png",
            "Health & Medicine": "Assets/Copy of 6.png",
            "Academic": "Assets/Copy of 7.png",
            "Research & Study": "Assets/Copy of 8.png"
        }

        self.category_images = []

        for idx, (category, image_file) in enumerate(categories.items()):
            image = Image.open(relative_path(image_file)).convert("RGBA")
            image = image.resize((100, 100), Image.Resampling.LANCZOS)
            photo = ImageTk.PhotoImage(image)
            self.category_images.append(photo)

            button = tk.Button(
                master,
                image=photo,
                command=lambda c=category: self.start_game(c),
                borderwidth=0,
                highlightthickness=0,
                bg='#12022b',
                activebackground='white'
            )

            row = idx // 4
            col = idx % 4
            x_offset = 0.25 * col + 0.125
            y_offset = 0.3 + 0.2 * row
            button.place(relx=x_offset, rely=y_offset, anchor='center')

            label = tk.Label(master, text=category, font=("Helvetica", 12), bg='white', fg='black')
            label.place(relx=x_offset, rely=y_offset + 0.08, anchor='center')

    def start_game(self, category):
        print(f"Category {category} selected")
        tk.messagebox.showinfo("Category Selected", f"Starting game with category: {category}")
        self.master.destroy()
        new_root = tk.Tk()
        MainGame(new_root, category)

class MainGame:
    def __init__(self, master, category):
        self.master = master
        master.configure(bg='grey')
        master.title("Hangman's Gambit - Main Game")
        master.state('zoomed')

        SetBackground(master, relative_path("Assets/frame4.png"))

        self.label_category = tk.Label(master, text=f"Category: {category}", font=("Helvetica", 18), bg='grey', fg='white')
        self.label_category.place(relx=0.5, rely=0.1, anchor='center')

        self.label_placeholder = tk.Label(master, text="Game Logic Here", font=("Helvetica", 18), bg='grey', fg='white')
        self.label_placeholder.place(relx=0.5, rely=0.5, anchor='center')

root = tk.Tk()
my_gui = StartMenu(root)
root.mainloop()
