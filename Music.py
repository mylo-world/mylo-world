from time import sleep
import os

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

class Colors:
    PURPLE = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

class Song:
    def __init__(self, title, artist):
        self.title = title
        self.artist = artist
        self.next = None
        self.prev = None

class MusicPlayer:
    def __init__(self):
        self.head = None  
        self.tail = None  
        self.current = None  
        self.temp = None  
        self.size = 0
        self.is_playing = False
        self.repeat = False
        self.visualizer_patterns = [
            "▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▇ ▆ ▅ ▄ ▃ ▂ ▁",
            "⣾ ⣽ ⣻ ⢿ ⡿ ⣟ ⣯ ⣷",
            "🎵 🎶 ♪ ♫ ♬",
            "≈≈≈≋≈≈≈≋≈≈≈≋≈≈≈"
        ]

    def display_banner(self):
        banner = f"""
    {Colors.PURPLE}
    ╔═══════════════════════════════════════════╗
    ║         🎵  AWO MUSIC PLAYER  🎵         ║
    ╚═══════════════════════════════════════════╝{Colors.RESET}
    """
        print(banner)

    def is_empty(self):
        return self.size == 0

    def add_song(self, title, artist):
        new_song = Song(title, artist)
        
        if self.is_empty():
            self.head = new_song
            self.tail = new_song
            self.current = new_song
            new_song.next = new_song
            new_song.prev = new_song
        else:
            self.temp = self.current.next
            self.current.next = new_song
            new_song.prev = self.current
            new_song.next = self.temp
            self.temp.prev = new_song
            
            if self.current == self.tail:
                self.tail = new_song
            
        self.size += 1
        print(f"\n{Colors.GREEN}✓ Added: {title} by {artist}{Colors.RESET}")
        sleep(1)

    def remove_song(self, title):
        if self.is_empty():
            print(f"\n{Colors.RED}✗ Playlist is empty!{Colors.RESET}")
            return

        self.temp = self.head
        found = False

        while True:
            if self.temp.title.lower() == title.lower():  
                found = True
                break
            
            if self.temp == self.tail:
                break
            
            self.temp = self.temp.next

        if not found:
            print(f"\n{Colors.RED}✗ Song titled '{title}' not found!{Colors.RESET}")
            return

        # Remove the found song
        removed_song = self.temp
        
        if self.size == 1:
            # Removing the only song
            self.head = None
            self.tail = None
            self.current = None
        else:
            # Remove the song and fix links
            if removed_song == self.head:
                self.head = removed_song.next
            if removed_song == self.tail:
                self.tail = removed_song.prev
            
            removed_song.prev.next = removed_song.next
            removed_song.next.prev = removed_song.prev
            
            if self.current == removed_song:
                self.current = self.head  

        self.size -= 1
        print(f"\n{Colors.RED}✗ Removed: {removed_song.title} by {removed_song.artist}{Colors.RESET}")
        sleep(1)

    def play_next(self):
        if self.is_empty():
            print(f"\n{Colors.RED}✗ Playlist is empty!{Colors.RESET}")
            return
            
        if not self.repeat and self.current == self.tail:
            print(f"\n{Colors.YELLOW}⚠ End of playlist! Enable repeat to continue.{Colors.RESET}")
            return
            
        self.current = self.current.next
        if self.current == self.head and not self.repeat:
            self.current = self.tail
            self.is_playing = False
            return
            
        self.is_playing = True
        self.display_now_playing()
        self.simulate_playing()

    def play_previous(self):
        if self.is_empty():
            print(f"\n{Colors.RED}✗ Playlist is empty!{Colors.RESET}")
            return
            
        if not self.repeat and self.current == self.head:
            print(f"\n{Colors.YELLOW}⚠ Start of playlist! Enable repeat to continue.{Colors.RESET}")
            return
            
        self.current = self.current.prev
        if self.current == self.tail and not self.repeat:
            self.current = self.head
            self.is_playing = False
            return
            
        self.is_playing = True
        self.display_now_playing()
        self.simulate_playing()

    def display_now_playing(self):
        if self.current:
            print(f"\n{Colors.CYAN}Now Playing: {self.current.title} by {self.current.artist}{Colors.RESET}")

    def simulate_playing(self):
        for pattern in self.visualizer_patterns:
            print(f"{Colors.GREEN}{pattern}{Colors.RESET}")
            sleep(0.5)

    def display_playlist(self):
        if self.is_empty():
            print(f"\n{Colors.YELLOW}Playlist is empty!{Colors.RESET}")
            return
            
        print(f"\n{Colors.PURPLE}=== PLAYLIST ({self.size} songs) ==={Colors.RESET}")
        self.temp = self.head
        count = 1
        
        while True:
            prefix = "▶" if (self.is_playing and self.temp == self.current) else " "
            print(f"{prefix} {count}. {self.temp.title} - {self.temp.artist}")
            
            if self.temp == self.tail:
                break
                
            self.temp = self.temp.next
            count += 1
            
        print(f"{Colors.PURPLE}={'=' * 25}{Colors.RESET}")

    def repeat_playlist(self):
        self.repeat = not self.repeat
        state = "enabled" if self.repeat else "disabled"
        print(f"\n{Colors.YELLOW}Repeat mode {state}.{Colors.RESET}")
        sleep(1)


def main():
    player = MusicPlayer()
    
    while True:
        clear_screen()
        player.display_banner()
        player.display_playlist()
        
        print(f"\n{Colors.YELLOW}Choose an action:{Colors.RESET}")
        print("1. Add a song")
        print("2. Remove a song by title")
        print("3. Play a song")
        print("4. Next song")
        print("5. Previous song")
        print("6. Repeat Playlist")
        print("7. Exit")
        
        choice = input(f"\n{Colors.GREEN}Enter your choice (1-7): {Colors.RESET}")
        
        if choice == '1':
            title = input(f"{Colors.CYAN}Enter song title: {Colors.RESET}")
            artist = input(f"{Colors.CYAN}Enter artist name: {Colors.RESET}")
            player.add_song(title, artist)
        elif choice == '2':
            title = input(f"{Colors.CYAN}Enter the title of the song to remove: {Colors.RESET}")
            player.remove_song(title)
        elif choice == '3':
            if player.is_playing:
                print(f"\n{Colors.YELLOW}Paused: {player.current.title} by {player.current.artist}{Colors.RESET}")
                player.is_playing = False
            else:
                player.display_now_playing()
                player.simulate_playing()
        elif choice == '4':
            player.play_next()
        elif choice == '5':
            player.play_previous()
        elif choice == '6':
            player.repeat_playlist()
        elif choice == '7':
            print(f"\n{Colors.PURPLE}Thanks for using Awo Music Player! Goodbye! 👋{Colors.RESET}")
            break
        else:
            print(f"\n{Colors.RED}Invalid choice! Please try again.{Colors.RESET}")
            sleep(1)

if __name__ == "__main__":
    main()