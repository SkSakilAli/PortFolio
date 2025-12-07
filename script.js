// --- Configuration ---
const outputContainer = document.getElementById('output-container');
// Set delays for extremely fast execution
const typingDelay = 5; // Delay in milliseconds for each character (VERY FAST)
const lineDelay = 50;  // Delay between complete lines (QUICK STEP)

// Define the content structure with simulated commands and their output
// *** UPDATE ALL DevName, Roles, and URLs IN THIS SECTION ***
const contentStructure = [
    { type: 'command', text: 'Initializing portfolio...' },
    { type: 'output', html: '<p>Connection established. Welcome to my digital workspace.</p>' },
    
    { type: 'command', text: 'ls -al' },
    { type: 'output', html: `
<pre>
-rw-r--r-- Sakil 4.5M       **about_me.sh**
-rw-r--r-- Sakil 8.9M       **social_links.txt**
-rw-r--r-- Sakil 3.1M       **skills.json**
-rw-r--r-- Sakil 5.4M       **experience.log**
-rw-r--r-- Sakil 7.2M       **projects.log** <-- NEW
-rw-r--r-- Sakil 1.8K       **contact_card.vcf** <-- NEW
</pre>`
    },
    
    { type: 'command', text: './about_me.sh' },
    { type: 'output', html: `
<h3>🚀 ABOUT ME</h3>
<p>Hello! I'm Sk Sakil Ali, a noob trying to be developer who want to code for living.</em></p>` 
    },

    { type: 'command', text: 'cat social_links.txt' },
    { type: 'output', html: `
<h3>🔗 SOCIAL LINKS</h3>
<ul>
    <li>GitHub: <a href="https://github.com/SkSakilAli" target="_blank">github.com/SkSakilAli</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/sk-sakil-ali" target="_blank">linkedin.com/in/sk-sakil-ali</a></li>
    <li>X: <a href="https://x.com/sk_sakil_ali" target="_blank">x.com/in/sk_sakil_ali</a></li>
    <li>Blog: <a href="https://blog.sakil.me" target="_blank">blog.sakil.me</a></li>
    <li>Email: <a href="mailto:hello@sakil.me">hello@sakil.me</a></li>

</ul>`
    },
    
    { type: 'command', text: 'json skills.json' },
    { type: 'output', html: `
<h3>🛠️ SKILLS</h3>
<p><strong>[Core Languages]</strong><br>
  > Python ,JavaScript (ES6+), HTML5, CSS3, C</p>
<p><strong>[Frameworks & Libraries]</strong><br>
  > FastAPI, React</p>
<p><strong>[Databases & Tools]</strong><br>
  > PostgreSQL,Git/Github, Figma, GNU/Linux, Postman</p>` 
    },
    
    { type: 'command', text: 'view experience.log' },
    { type: 'output', html: `
<h3>💼 EXPERIENCE HIGHLIGHTS</h3>
<p><strong>Python Backend Developer Intern @ Avinyaak Tech and Consultancy: Sept 2025 - Present</strong><br>
  * Build Backend Systems using FastAPI**.<br>
  

<p><strong>Freelance Web Content Writer: Jan 2021 - May 2022</strong><br>
  * Crafted Highly SEO Optimised Enaging Content around Tech, Lifestyle and Tutorials.<br>
  * Improved Client's Page Rank and ranked articles in Googles Top SERP.</p>`
    },
    
    // --- NEW PROJECT SECTION ---
    { type: 'command', text: 'cat projects.log' },
    { type: 'output', html: `
<h3>📁 FEATURED PROJECTS</h3>
<p><strong>1. Taskaro</strong></p>
<ul>
    <li>**Tech:** FastAPI, Sqlalchemy, Python Jose, Passlib, Sqlite and JWT</li>
    <li>**Description:** A simple Task Management Backend.</li>
    <li>**Link:** <a href="https://github.com/SkSakilAli/Taskaro" target="_blank">View in Github</a></li>
</ul>
<p><strong>2. ToDo Application</strong></p>
<ul>
    <li>**Tech:** JavaScript, HTML, CSS</li>
    <li>**Description:** A Simple Interactive ToDo Frontend with timer and clock.</li>
    <li>**Link:** <a href="https://todo.sakil.me" target="_blank">View Live</a></li>
     <li>**Link:** <a href="https://github.com/SkSakilAli/Doto" target="_blank">View in Github</a></li>

</ul>
<p><strong>3. Type Coder</strong></p>
<ul>
    <li>**Tech:** JavaScript, HTML, CSS</li>
    <li>**Description:** A Simple Typing Speed Tester For Coder.</li>
    <li>**Link:** <a href="https://typecoder.sakil.me" target="_blank">View Live</a></li>
     <li>**Link:** <a href="https://github.com/SkSakilAli/typecoder" target="_blank">View in Github</a></li>

</ul>`


    },

    // --- NEW CONTACT SECTION ---
    { type: 'command', text: 'open contact_card.vcf' },
    { type: 'output', html: `
<h3>📧 CONTACT ME</h3>
<p> Feel free to connect or send a message directly.</p>
<ul>
    <li>**Email:** <a href="mailto:hello@saki.me">hello@sakil.me</a></li>
    <li>**Connect:** <a href="https://linkedin.com/in/sk-sakil-ali" target="_blank">LinkedIn Profile</a></li>
    <li>**Resume:** <a href="[Link to your PDF Resume]" target="_blank">Download Resume (PDF)</a></li>
</ul>
<p>----------------------------------------------</p>`
    },
    
    { type: 'output', html: '<p>--- End of Session ---</p>' }
];

// --- Core Typing Logic ---

let contentIndex = 0;
let charIndex = 0;
let currentElement = null;
let currentTypingElement = null;

function typeContent() {
    if (contentIndex < contentStructure.length) {
        const item = contentStructure[contentIndex];

        if (item.type === 'command') {
            // Create the prompt line for the command
            currentElement = document.createElement('div');
            currentElement.className = 'prompt-line';
            currentElement.innerHTML = `<span class="prompt-prefix">[Sakil@portfolio ~] ❯</span> <span class="typing-text"></span>`;
            outputContainer.appendChild(currentElement);
            
            currentTypingElement = currentElement.querySelector('.typing-text');
            charIndex = 0;
            typeCommand(item); 
        } else if (item.type === 'output') {
            // Display output instantly
            currentElement = document.createElement('div');
            currentElement.className = 'output';
            currentElement.innerHTML = item.html; 
            outputContainer.appendChild(currentElement);
            
            // Move to the next item quickly
            contentIndex++;
            setTimeout(typeContent, lineDelay);
            
            // Scroll to the bottom
            outputContainer.scrollTop = outputContainer.scrollHeight;
        }
    } else {
        // All content is displayed. The final static prompt is already in HTML.
        // Scroll to the bottom one last time to ensure the final prompt is visible.
        document.getElementById('main-content').scrollTop = document.getElementById('main-content').scrollHeight;
    }
}

function typeCommand(item) {
    if (charIndex <= item.text.length) {
        // Append one character at a time for the command
        let textChunk = item.text.substring(0, charIndex);
        
        // Update the innerHTML with the text and the temporary blinking cursor
        currentTypingElement.innerHTML = textChunk + '<span class="cursor"></span>';

        // Scroll to the bottom
        outputContainer.scrollTop = outputContainer.scrollHeight;

        charIndex++;
        // Use the very fast typingDelay for the command
        setTimeout(() => typeCommand(item), typingDelay);
    } else {
        // Command finished typing
        
        // Remove the temporary blinking cursor from the command line
        currentTypingElement.innerHTML = item.text; 
        
        contentIndex++;
        // Use the quick lineDelay to move to the next item (which will be the instant output)
        setTimeout(typeContent, lineDelay);
    }
}

// Initial start point
typeContent();
