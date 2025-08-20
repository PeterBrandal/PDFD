// Function to fetch the definition from the API
async function fetchDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      
      // The API returns an array of entries. We'll use the first one.
      const definition = data[0].meanings[0].definitions[0].definition;
      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      
      return {
        word: data[0].word,
        partOfSpeech: partOfSpeech,
        definition: definition
      };
  
    } catch (error) {
      console.error('Failed to fetch definition:', error);
      return {
        word: word,
        definition: "Sorry, no definition found."
      };
    }
  }
  
  // This script runs when the popup is opened.
  document.addEventListener('DOMContentLoaded', async () => {
      const wordDisplay = document.getElementById('word-display');
      const definitionDisplay = document.getElementById('definition-display');
  
      try {
          const selectedText = await navigator.clipboard.readText();
          const trimmedText = selectedText.trim();
          
          if (trimmedText) {
              wordDisplay.textContent = trimmedText;
              definitionDisplay.textContent = 'Loading definition...';
  
              const result = await fetchDefinition(trimmedText);
  
              if (result.definition) {
                  wordDisplay.textContent = `${result.word} (${result.partOfSpeech || 'n/a'})`;
                  definitionDisplay.textContent = result.definition;
              } else {
                  wordDisplay.textContent = `"${trimmedText}" not found.`;
                  definitionDisplay.textContent = '';
              }
          } else {
              wordDisplay.textContent = 'No text copied.';
              definitionDisplay.textContent = 'Highlight a word, copy it (Ctrl+C), and press Ctrl+L.';
          }
      } catch (err) {
          wordDisplay.textContent = 'Error reading clipboard.';
          definitionDisplay.textContent = 'Please grant permission to read clipboard text.';
      }
  });