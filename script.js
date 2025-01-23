async function transformText(style) {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText');
    const loadingSpinner = document.getElementById('loading');
    
    if (!inputText.trim()) {
        alert('Please enter some text to transform.');
        return;
    }

    // Show loading spinner
    loadingSpinner.classList.remove('hidden');
    
    try {
        const transformedText = await getOpenAITransformation(inputText, style);
        
        // Apply color tint based on style
        switch(style) {
            case 'D': outputText.style.backgroundColor = '#fff0f0'; break;
            case 'I': outputText.style.backgroundColor = '#fffff0'; break;
            case 'S': outputText.style.backgroundColor = '#f0fff0'; break;
            case 'C': outputText.style.backgroundColor = '#f0f8ff'; break;
        }
        
        outputText.value = transformedText;
    } catch (error) {
        console.error('Error:', error);
        alert('Error transforming text. Please try again.');
    } finally {
        // Hide loading spinner
        loadingSpinner.classList.add('hidden');
    }
}

async function getOpenAITransformation(text, style) {
    const stylePrompts = {
        'D': "Transform this text to be more direct, results-oriented, and brief. Remove unnecessary pleasantries and focus on actions and outcomes:",
        'I': "Transform this text to be more enthusiastic, friendly, and engaging. Add positive energy and make it more conversational:",
        'S': "Transform this text to be more supportive, gentle, and patient. Focus on harmony and making others comfortable:",
        'C': "Transform this text to be more precise, logical, and structured. Add details and organize information clearly:"
    };

    const prompt = stylePrompts[style];
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    "role": "system",
                    "content": "You are a communication style expert specializing in DISC personality profiles."
                },
                {
                    "role": "user",
                    "content": `${prompt}\n\nOriginal text: "${text}"`
                }
            ],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
} 