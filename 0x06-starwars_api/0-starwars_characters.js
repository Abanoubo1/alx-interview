import requests
import sys

def get_movie_characters(movie_id):
    # Define the base URL of the Star Wars API
    base_url = 'https://swapi.dev/api/films/'
    
    # Construct the URL for the given movie ID
    url = f"{base_url}{movie_id}/"
    
    try:
        # Send a GET request to the API to fetch the movie data
        response = requests.get(url)
        
        # Raise an exception if the request was not successful
        response.raise_for_status()
        
        # Parse the JSON data from the response
        data = response.json()
        
        # Get the list of character URLs from the movie data
        character_urls = data.get('characters', [])
        
        # Iterate through each character URL and fetch the character data
        for character_url in character_urls:
            char_response = requests.get(character_url)
            char_response.raise_for_status()
            char_data = char_response.json()
            
            # Print the character's name
            print(char_data['name'])
    
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")

def main():
    # Check if a movie ID was provided as an argument
    if len(sys.argv) < 2:
        print("Usage: python script.py <movie_id>")
        sys.exit(1)
    
    # Get the movie ID from the first positional argument
    movie_id = sys.argv[1]
    
    # Fetch and print the characters for the given movie ID
    get_movie_characters(movie_id)

if __name__ == '__main__':
    main()
