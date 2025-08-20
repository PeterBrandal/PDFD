async function fetchDefinition(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.tolowerCase()}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data[0]; 

        const definition = data[0].meanings[0].definitions[0].definition;
        return definition;
    }
}




document.addEventListener('DOMContentLoaded',() {
    
    chrome.runtime.sendMessage({action: 'get_selected_text'}, (response) => {
        if (response && response.selectedText){
            document.getElementById('word-display').textContent = response.selectedText;
        } else {
            document.getElementById('word-display').textContent = 'No text selected';
        }
    });
});