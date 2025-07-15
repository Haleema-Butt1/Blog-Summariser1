export const generateSummary = (text: string): string => {
  // Fallback for very short content
  if (text.length < 50) return text
  
  // Split into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  
  // Select strategy based on content
  if (sentences.length >= 3) {
    return sentences.slice(0, 3).join(' ') + '...'
  } 
  else if (sentences.length > 0) {
    return sentences.join(' ') + '...'
  }
  
  // Character-based fallback
  return text.slice(0, 150) + (text.length > 150 ? '...' : '')
}