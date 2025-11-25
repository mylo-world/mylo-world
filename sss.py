# import tkinter as tk
# import time

# class TimerGame:
#     def __init__(self, master):
#         self.master = master
#         self.master.title("Game Timer Example")
        
#         # Timer attributes
#         self.start_time = None
#         self.running = False
        
#         # Create a frame for the timer
#         self.timer_frame = tk.Frame(master, bg="#12022b", padx=20, pady=20)
#         self.timer_frame.pack(pady=20)

#         # Create a label to display the timer
#         self.timer_label = tk.Label(self.timer_frame, text="Time: 0.00", font=("Helvetica", 24), bg="#12022b", fg="white")
#         self.timer_label.pack()

#         # Start button to begin the game
#         self.start_button = tk.Button(master, text="Start Game", command=self.start_game, bg="#73994C", fg="white", font=("Helvetica", 16))
#         self.start_button.pack(pady=10)

#         # End button to finish the game
#         self.end_button = tk.Button(master, text="End Game", command=self.end_game, bg="#D74531", fg="white", font=("Helvetica", 16))
#         self.end_button.pack(pady=10)

#     def start_game(self):
#         """Start the timer when the game begins."""
#         if not self.running:
#             self.start_time = time.time()
#             self.running = True
#             self.update_timer()

#     def update_timer(self):
#         """Update the timer label every 100 milliseconds."""
#         if self.running:
#             elapsed_time = time.time() - self.start_time
#             self.timer_label.config(text=f"Time: {elapsed_time:.2f}")
#             self.master.after(100, self.update_timer)  # Update every 100 milliseconds

#     def end_game(self):
#         """Stop the timer when the game ends."""
#         if self.running:
#             self.running = False
#             final_time = self.timer_label.cget("text")
#             print(f"Game finished! Total time taken: {final_time}")

# # Create the main window
# root = tk.Tk()
# game = TimerGame(root)
# root.mainloop()






import tkinter as tk

# Create the main window
root = tk.Tk()
root.title("Scrollable Text Example")
root.geometry("400x300")

# Create a canvas
canvas = tk.Canvas(root, width=400, height=300, bg="lightgray")
canvas.pack()

# Draw an object on the canvas
canvas.create_oval(100, 100, 300, 200, fill="blue")

# Create a scrollbar
scrollbar = tk.Scrollbar(root)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

# Create a text widget with the scrollbar
text = tk.Text(root, wrap=tk.WORD, yscrollcommand=scrollbar.set, bg="#12022b", fg="white")
text.place(x=50, y=50, width=300, height=200)
scrollbar.config(command=text.yview)

# Insert some long text into the text widget
long_text = """The Word Was hyper
Extremely rapid or out of control.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada."""
text.insert(tk.END, long_text)

# Run the application
root.mainloop()
