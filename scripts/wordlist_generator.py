import json

# Define which hand and finger types each letter corresponds to for touch typing
finger_mapping = {
    # Left hand
    'q': {'hand': 'left', 'finger': 'pinky'}, 'a': {'hand': 'left', 'finger': 'pinky'}, 'z': {'hand': 'left', 'finger': 'pinky'},
    'w': {'hand': 'left', 'finger': 'ring'}, 's': {'hand': 'left', 'finger': 'ring'}, 'x': {'hand': 'left', 'finger': 'ring'},
    'e': {'hand': 'left', 'finger': 'middle'}, 'd': {'hand': 'left', 'finger': 'middle'}, 'c': {'hand': 'left', 'finger': 'middle'},
    'r': {'hand': 'left', 'finger': 'index'}, 'f': {'hand': 'left', 'finger': 'index'}, 'v': {'hand': 'left', 'finger': 'index'},
    't': {'hand': 'left', 'finger': 'index'}, 'g': {'hand': 'left', 'finger': 'index'}, 'b': {'hand': 'left', 'finger': 'index'},

    # Right hand
    'y': {'hand': 'right', 'finger': 'index'}, 'h': {'hand': 'right', 'finger': 'index'}, 'n': {'hand': 'right', 'finger': 'index'},
    'u': {'hand': 'right', 'finger': 'index'}, 'j': {'hand': 'right', 'finger': 'index'}, 'm': {'hand': 'right', 'finger': 'index'},
    'i': {'hand': 'right', 'finger': 'middle'}, 'k': {'hand': 'right', 'finger': 'middle'},
    'o': {'hand': 'right', 'finger': 'ring'}, 'l': {'hand': 'right', 'finger': 'ring'},
    'p': {'hand': 'right', 'finger': 'pinky'}, ';': {'hand': 'right', 'finger': 'pinky'},

    # Spacebar (typically both hands are used)
    ' ': {'hand': 'both', 'finger': 'thumbs'}
}

# Set of right-hand letters for percentage calculation
right_hand_letters = set(['y', 'u', 'i', 'o', 'p', 'h', 'j', 'k', 'l', 'n', 'm'])

# Function to calculate the percentage of characters typed by the right hand
def calculate_right_hand_percentage(word):
    if len(word) == 0:
        return 0.0
    right_hand_count = sum(1 for char in word.lower() if char in right_hand_letters)
    return (right_hand_count / len(word)) * 100

# Function to analyze the word list
def analyze_words(word_list):
    analysis = []
    
    for word in word_list:
        hands_used = set()
        fingers_used = set()
        
        # Analyze each character in the word
        for char in word.lower():
            if char in finger_mapping:
                hands_used.add(finger_mapping[char]['hand'])
                fingers_used.add(finger_mapping[char]['finger'])
        
        # Calculate the right-hand percentage for the word
        right_hand_percentage = calculate_right_hand_percentage(word)
        
        # Add the word data to the analysis list
        analysis.append({
            'word': word,
            'hands': list(hands_used),
            'fingers': list(fingers_used),
            'rightHandPercentage': right_hand_percentage
        })
    
    return analysis

# Sample word list
def read_words_from_file(file_path):
    words = []
    with open(file_path, 'r') as file:
        for line in file:
            # Strip whitespace characters like \n at the end of each line and add to the list
            word = line.strip()
            if word:  # Avoid adding empty lines
                words.append(word)
    return words


# Analyze the words
word_analysis = analyze_words(read_words_from_file('wordlist.txt'))

# Save the analysis to a JSON file
with open('../src/assets/word_analysis.json', 'w') as f:
    json.dump(word_analysis, f, indent=4)

print("Word analysis complete! Results saved to word_analysis.json")
