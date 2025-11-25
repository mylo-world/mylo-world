import random

def read_vocab(file_path):
    vocab = {}
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            word, definition = line.strip().split(": ", 1)
            vocab[word.lower()] = definition
    return vocab

def get_word(vocab):
    word = random.choice(list(vocab.keys()))
    return word, vocab[word]

vocab_file_path = r'C:\Users\LOQ\Python latihan\college studies\vocab.txt' 
vocab = read_vocab(vocab_file_path)
chosen_word, meaning = get_word(vocab)
word_length = len(chosen_word)
lives = 10

print('Welcome to the Hangman Game!!')
print(f'You have {lives} lives')
print('Good Luck!')

display = ["_"] * word_length
print('I am thinking of a word that is', word_length, 'letters long.')
print(' '.join(display))

while True:
    guess = input('Guess a letter: ').lower()
    
    if guess in display:
        print('You have already guessed this letter!')
        print('')
        continue

    if guess not in chosen_word:
        print('Wrong guess!')
        lives -= 1
        print('Remaining lives left:', lives)
        print('')
    else:
        for i in range(word_length):
            if chosen_word[i] == guess:
                display[i] = guess
        print('Good guess!')

    print(' '.join(display))
    
    if lives < 1:
        print('You lose!')
        print(f'The word was {chosen_word.title()}. Meaning: {meaning}')
        break
    
    if "_" not in display:
        print('You win!')
        print(f'The word was {chosen_word.title()}. Meaning: {meaning}')
        break
