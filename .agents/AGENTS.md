## Professional Documentation Standards
When generating or updating a `README.md` for any repository, you must adhere to a premium, user-friendly, and highly professional format. 
1. **Visual Hierarchy**: Use emojis strategically for section headers to improve scannability.
2. **Badges**: Always include standard shield.io badges for the tech stack (e.g., HTML, CSS, React) at the top of the document.
3. **Core Sections**: Every README must include:
   - A bold Project Title and punchy one-sentence Overview.
   - A "✨ Key Features" section detailing the standout technical achievements.
   - A "🚀 Getting Started / Installation" section with clear, copy-pasteable terminal commands.
   - A "🛠️ Tech Stack" section.
   - A "📫 Contact / Connect" section with formatted links.
4. **Formatting**: Use markdown tables or lists for readability, and ensure code blocks specify their language for syntax highlighting.

## Security Best Practices
When generating or updating HTML files for a web application, you must proactively include robust security protections:
1. **Content Security Policy (CSP)**: Always include a `<meta http-equiv="Content-Security-Policy">` tag in the `<head>` of HTML files.
2. **Dynamic Generation**: Formulate the `content` string to strictly allow only the required external sources (e.g., specific CDNs, fonts) while permitting necessary internal resources (`'self'`).
3. **Graceful Degradation**: If inline scripts or styles are heavily relied upon by the framework/template, use `'unsafe-inline'` where necessary but ensure the `default-src` remains strict.
