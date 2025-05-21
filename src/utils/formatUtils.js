/**
 * Utility functions for formatting chatbot responses
 */

/**
 * Formats a disease analysis response with rich HTML
 * @param {string} text - Raw text from API response
 * @returns {string} HTML formatted text
 */
export const formatAnalysisToHtml = (text) => {
  if (!text) return '';
  
  // Process sections with appropriate styling
  let html = '<div class="analysis-result">';
  
  // Handle the main sections
  html += text
    .replace(/\*DIAGNOSED CONDITION:\*/g, '<div class="section-title diagnosis-title">DIAGNOSED CONDITION:</div>')
    .replace(/\*KEY SYMPTOMS OBSERVED:\*/g, '<div class="section-title symptoms-title">KEY SYMPTOMS OBSERVED:</div>')
    .replace(/\*ADDITIONAL INFORMATION:\*/g, '<div class="section-title info-title">ADDITIONAL INFORMATION:</div>')
    .replace(/\*RECOMMENDATIONS:\*/g, '<div class="section-title recs-title">RECOMMENDATIONS:</div>')
    .replace(/\*DISCLAIMER:\*/g, '<div class="section-title disclaimer-title">DISCLAIMER:</div>');
    
  // Handle specific disease or symptom names (items in asterisks)
  html = html.replace(/\*([^*]+)\*/g, '<span class="highlighted-term">$1</span>');
  
  // Format numbered list items in recommendations
  html = html.replace(/(\d+\.\s[^\n]+)/g, '<div class="recommendation-item">$1</div>');
  
  // Format key-value pairs like "Confidence Level: High"
  html = html.replace(/(Confidence Level|Severity Level|Affected Area|Pattern):\s([^\n]+)/g, 
    '<div class="info-pair"><span class="info-key">$1:</span> <span class="info-value">$2</span></div>');
  
  html += '</div>';
  
  return html;
};

/**
 * Adds CSS styles for the formatted analysis
 * @returns {string} CSS styles as a string
 */
export const getAnalysisStyles = () => {
  return `
    .analysis-result {
      font-family: system-ui, -apple-system, sans-serif;
    }
    .section-title {
      font-weight: 700;
      font-size: 1.1em;
      margin-top: 12px;
      margin-bottom: 8px;
      color: #047857;
    }
    .diagnosis-title {
      color: #059669;
    }
    .highlighted-term {
      font-weight: 700;
      color: #059669;
      display: block;
      margin-left: 8px;
      margin-top: 4px;
    }
    .info-pair {
      margin-left: 8px;
      margin-top: 4px;
    }
    .info-key {
      font-weight: 600;
      margin-right: 4px;
    }
    .recommendation-item {
      margin-left: 8px;
      margin-top: 6px;
    }
    .disclaimer-title {
      color: #6b7280;
      font-size: 0.9em;
      margin-top: 14px;
    }
  `;
};

/**
 * Creates a self-contained HTML string with styles embedded
 * @param {string} text - Raw text from API response
 * @returns {string} Complete HTML with embedded styles
 */
export const createFormattedAnalysis = (text) => {
  return `
    <style>${getAnalysisStyles()}</style>
    ${formatAnalysisToHtml(text)}
  `;
};
