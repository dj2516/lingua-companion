# Aria 💕 - Multilingual AI Companion & Spelling Tutor

A companion chatbot designed to chat naturally and warmly like a supportive partner while detecting, explaining, and correcting spelling and grammar mistakes in **English**, **Hinglish**, and **Marathi-English (Maranglish)**.

---

## 🌟 Features

- **Warm & Empathetic Companion**: Converses casually and affectionately in the language you speak.
- **Multilingual Spelling Engine**:
  - **English**: Catches typical typos (e.g. `collge` → `college`, `girlfrien` → `girlfriend`, `beautifull` → `beautiful`).
  - **Hinglish**: Identifies phonetically missing aspirates and vowels (e.g. `muje` → `mujhe`, `bhot` → `bohot`, `rhi` → `rahi`).
  - **Marathi (Roman Script)**: Corrects agreement and compounding (e.g. `kasa ahe` → `kasa ahes`, `lavkr` → `lavkar`, `bhetuya` → `bhetu ya`).
- **Inline Spelling Spotlight**: Shows clean mistake strikethroughs and corrections directly below the message.
- **Learning Tips Panel**: Clear, contextual explanations on why words are spelled or conjugated in a particular way.
- **Proactive Topic Starter**: Hit *"💬 Aria, talk to me!"* anytime to get fun icebreakers and questions.
- **Zero Dependencies**: 100% vanilla client-side HTML, CSS, and JavaScript. Runs offline instantly in any browser.

---

## 📁 Project Structure

```text
lingua-companion/
├── index.html        # Main web interface
├── style.css         # Modern, responsive styling system
├── app.js            # Companion logic & multi-dialect spelling engine
├── avatar.jpg        # Companion avatar asset
├── server.ps1        # Optional local PowerShell test server
├── .gitignore        # Standard Git ignore rules
└── README.md         # Project documentation
```

---

## 🚀 Getting Started

### Option 1: Direct in Browser
Simply double-click [`index.html`](index.html) or drag and drop it into Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: Local Server (Optional)
Run the bundled PowerShell web server:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🛠️ Built With

- **HTML5** & **Semantic Elements**
- **Modern CSS3** (Flexbox, CSS Grid, Glassmorphism, Responsive design)
- **Vanilla JavaScript** (RegEx phonetic rules, stateful chat stream, local audio feedback)
- **Google Fonts** (Plus Jakarta Sans)

---

## 📄 License

This project is licensed under the MIT License - feel free to use and modify it!
