function transformText(style) {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText');
    
    if (!inputText.trim()) {
        alert('Please enter some text to transform.');
        return;
    }

    let transformedText = '';
    
    switch(style) {
        case 'D':
            transformedText = transformDominance(inputText);
            outputText.style.backgroundColor = '#fff0f0';
            break;
        case 'I':
            transformedText = transformInfluence(inputText);
            outputText.style.backgroundColor = '#fffff0';
            break;
        case 'S':
            transformedText = transformSteadiness(inputText);
            outputText.style.backgroundColor = '#f0fff0';
            break;
        case 'C':
            transformedText = transformConscientiousness(inputText);
            outputText.style.backgroundColor = '#f0f8ff';
            break;
    }
    
    outputText.value = transformedText;
}

function transformDominance(text) {
    // Make text more direct and action-oriented
    let transformed = text
        .replace(/(?:please|kindly|would you mind|if you could)/gi, '')
        .replace(/(?:I think|I believe|maybe|perhaps)/gi, '')
        .replace(/\b(?:we should|we could)\b/gi, 'we will')
        .replace(/\b(?:might|may)\b/gi, 'will')
        .split('.').map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join('. ');
    
    return transformed + (transformed.endsWith('.') ? '' : '.');
}

function transformInfluence(text) {
    // Make text more enthusiastic and friendly
    let transformed = text
        .replace(/\b(?:good|great)\b/gi, 'excellent')
        .replace(/\b(?:hello|hi)\b/gi, 'Hi there!')
        .replace(/!/g, '!!')
        .replace(/\b(?:thanks|thank you)\b/gi, 'Thank you so much')
        .split('.').map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .map(sentence => sentence + '!')
        .join(' ');
    
    return transformed;
}

function transformSteadiness(text) {
    // Make text more supportive and gentle
    let transformed = text
        .replace(/\b(?:must|should|have to)\b/gi, 'might consider')
        .replace(/\b(?:immediately|asap|urgently)\b/gi, 'when you\'re ready')
        .replace(/\b(?:but|however)\b/gi, 'and')
        .split('.').map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join('. ');
    
    return transformed + (transformed.endsWith('.') ? '' : '.');
}

function transformConscientiousness(text) {
    // Make text more precise and structured
    let sentences = text.split('.');
    let transformed = sentences
        .map((sentence, index) => {
            sentence = sentence.trim();
            if (sentence.length === 0) return '';
            if (index === 0) {
                return `First, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
            }
            if (index === sentences.length - 2) {
                return `Finally, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
            }
            if (sentence.length > 0) {
                return `Next, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
            }
            return '';
        })
        .filter(sentence => sentence.length > 0)
        .join('. ');
    
    return transformed + (transformed.endsWith('.') ? '' : '.');
} 