import json
import os

# Function to read the JSON file and write words to a text file
def write_words_from_json(json_file, output_file):
    # Check if the JSON file exists
    if not os.path.exists(json_file):
        print(f"Error: {json_file} does not exist.")
        return
    
    # Read the JSON file (which consists only of a list)
    try:
        with open(json_file, "r") as file:
            words = json.load(file)
            
            # Ensure the JSON file contains a list
            if not isinstance(words, list):
                print(f"Error: Expected a list in the JSON file, but got {type(words).__name__}.")
                return
        
    except json.JSONDecodeError:
        print(f"Error: Failed to decode {json_file}. Ensure it's valid JSON.")
        return
    
    # Write the words to the output file, one word per line
    with open(output_file, "w") as file:
        for word in words:
            file.write(word + "\n")
    
    print(f"Words have been written to {output_file}")

# Example usage
json_file_path = "words.json"  # Path to your input JSON file
output_file_path = "words_list.txt"  # Output text file

write_words_from_json(json_file_path, output_file_path)
