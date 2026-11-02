# 🌌 NYX Chat
### 🔴 Red Team AI v3.1.3

<p align="center">
  <a href="https://github.com/gailowilly649-linux/RedTeamAI/stargazers">
    <img src="https://img.shields.io/github/stars/gailowilly649-linux/RedTeamAI?style=for-the-badge&color=ff5555&logo=github" alt="Stars"/>
  </a>
  <a href="https://github.com/gailowilly649-linux/RedTeamAI/network/members">
    <img src="https://img.shields.io/github/forks/gailowilly649-linux/RedTeamAI?style=for-the-badge&color=50fa7b&logo=github" alt="Forks"/>
  </a>
  <a href="https://github.com/gailowilly649-linux">
    <img src="https://img.shields.io/badge/Author-gailowilly649--linux-BD93F9?style=for-the-badge&logo=github&logoColor=white" alt="Author"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Kotlin-2.1.0-%237F52FF?style=flat-square&logo=kotlin&logoColor=white" alt="Kotlin 2.1.0"/>
  <img src="https://img.shields.io/badge/Android%20Compile%20SDK-35-3DDC84?style=flat-square&logo=android&logoColor=white" alt="Compile SDK 35"/>
  <img src="https://img.shields.io/badge/Android%20Min%20SDK-26-3DDC84?style=flat-square&logo=android&logoColor=white" alt="Min SDK 26"/>
  <img src="https://img.shields.io/badge/Model-Llama%203.1%20Nemotron-FF5555?style=flat-square&logo=nvidia&logoColor=white" alt="Model Llama 3.1 Nemotron"/>
  <img src="https://img.shields.io/badge/License-Apache%202.0-yellow?style=flat-square" alt="License Apache 2.0"/>
</p>

---

<p align="center">
  <b>NYX Chat</b> (powered by <i>Red Team AI</i>) is a premium, native Android conversation client designed specifically for offensive security researchers, penetration testers, and cybersecurity enthusiasts.
  <br/><br/>
  Featuring a hot-warning, pitch-black hacker terminal aesthetic, it connects to top AI providers (NVIDIA Free AI, Groq, OpenRouter, DeepSeek, xAI Grok, OpenAI, Mistral, Perplexity, Together) with automated multi-language response matching and customizable API key configurations.
</p>

---

## ⭐️ Support the Project & Feedback

Thank you so much for using **NYX Chat**! If you liked the application or want to request new features, feel free to open an issue or share your feedback.

If you find this client helpful for your operations, exploit research, or daily workflows, please consider starring the repository! A little support goes a long way and helps keep this project active and growing.

<p align="center">
  <a href="https://github.com/gailowilly649-linux/RedTeamAI">
    <img src="https://img.shields.io/badge/⭐-STAR%20THIS%20REPO-FFB86C?style=for-the-badge&logo=github" alt="Star RedTeamAI"/>
  </a>
</p>

---

## ✨ Key Features

- **Multi-Provider AI Integration:** Support for NVIDIA AI, Groq, OpenRouter, DeepSeek, Mistral, OpenAI, and more.
- **Custom API Key Support:** Configure your own API key directly within the app's Settings dialog with local encrypted preference storage.
- **Dynamic Model Resolution:** Uses provider-specific active models (e.g. `nvidia/llama-3.1-nemotron-70b-instruct`, `llama-3.3-70b-versatile`, `deepseek-chat`).
- **Hacker Terminal Aesthetic:** Sleek, pitch-black dark theme with warning-red highlights and console-green accents using monospace typography.
- **Offline Mission Log:** All operations and conversation history are saved securely in a local Room database (SQLite) for instant retrieval.
- **Full Message Context:** Sends up to the last 40 messages as history on every request for coherent, context-aware responses.
- **Auto Language Matching:** The AI automatically detects your input language (English, Tagalog, Spanish, etc.) and responds in the exact same tongue.
- **Offensive Security System Prompt:** Custom Red Team AI persona tailored for exploit development, CTFs, OSINT, vulnerability scanning, and reverse engineering.

---

## 🧱 Architecture

```
com.nyx.chat/
├── data/
│   ├── api/                  # Retrofit API definitions & data models
│   │   ├── AiProvider.kt     # Enum defining supported providers, base URLs & default models
│   │   ├── ChatRequest.kt    # OpenAI-compatible request body
│   │   ├── ChatResponse.kt   # OpenAI-compatible response body
│   │   └── RedTeamApi.kt     # Retrofit interface (direct API mode)
│   ├── local/                # Room database, entities & DAOs
│   │   ├── AppDatabase.kt
│   │   ├── ConversationDao.kt
│   │   ├── ConversationEntity.kt
│   │   ├── MessageDao.kt
│   │   └── MessageEntity.kt
│   └── repository/           # Single source of truth
│       └── ChatRepository.kt # Builds Retrofit per provider, dispatches requests
├── di/                       # Dagger Hilt Modules
│   └── NetworkModule.kt      # (minimal graph provider)
├── ui/
│   ├── navigation/           # Jetpack Compose navigation graph
│   │   └── NavGraph.kt       # Auto-launches into chat on startup
│   ├── screens/
│   │   ├── chat/             # Terminal-style chat screen & ViewModel
│   │   ├── conversationlist/ # Card-based operation history screen
│   │   └── settings/         # Provider selection & API key configuration dialog
│   └── theme/                # Pitch-black dark theme & monospace typography
├── MainActivity.kt           # Single activity host
└── NyxApp.kt                 # Application controller (@HiltAndroidApp)
```

---

## 🚀 Getting Started

### 📥 Download Latest APK
Install NYX Chat instantly by downloading the latest pre-compiled APK from the Releases page:

- **[Download RedTeamAI-v3.1.3-debug.apk](https://github.com/gailowilly649-linux/RedTeamAI/releases/latest)**

---

### 🛠 Build from Source

#### Prerequisites

| Tool | Version |
|------|---------|
| Android Studio | Ladybug (2024.3+) or newer |
| JDK | 17 |
| Android SDK | 35 |

#### Clone & Build

```bash
# Clone the repository
git clone https://github.com/gailowilly649-linux/RedTeamAI.git
cd RedTeamAI

# Compile and package debug APK
./gradlew clean assembleDebug

# Built APK will be generated with custom version naming:
# app/build/outputs/apk/debug/RedTeamAI-v3.1.3-debug.apk

# Install on connected device via ADB
adb install app/build/outputs/apk/debug/RedTeamAI-v3.1.3-debug.apk
```

#### Install Without ADB

If you don't have ADB set up, transfer the APK to your phone manually:

1. Copy `app/build/outputs/apk/debug/RedTeamAI-v3.1.3-debug.apk` to your phone (via USB file transfer, Google Drive, etc.)
2. On your phone: **Settings → Apps → Special App Access → Install Unknown Apps** → allow your file manager
3. Tap the APK file to install

---

## 🌐 Supported Providers

| Provider | Default Model | Base URL |
|----------|---------------|----------|
| NVIDIA Free AI | `nvidia/llama-3.1-nemotron-70b-instruct` | `https://integrate.api.nvidia.com/` |
| Groq | `llama-3.3-70b-versatile` | `https://api.groq.com/openai/` |
| OpenRouter | `meta-llama/llama-3.3-70b-instruct` | `https://openrouter.ai/api/` |
| DeepSeek | `deepseek-chat` | `https://api.deepseek.com/` |
| xAI Grok | `grok-3` | `https://api.x.ai/` |
| OpenAI | `gpt-4o` | `https://api.openai.com/` |
| Mistral AI | `mistral-large-latest` | `https://api.mistral.ai/` |
| Perplexity | `llama-3.1-sonar-large-128k-online` | `https://api.perplexity.ai/` |

---

## 🛠 Tech Stack

| Layer | Library |
|-------|---------|
| UI | Jetpack Compose + Material 3 |
| DI | Dagger Hilt |
| Persistence | Room (SQLite) |
| Networking | Retrofit 2 + OkHttp 4 |
| Serialization | Gson |
| Markdown | Markwon |

---

## 📋 Changelog

### v3.1.3 *(Current)*
- ✅ **Custom APK Output Naming** — configured Gradle output formatting so built APKs are named `RedTeamAI-v3.1.3-debug.apk`.
- ✅ **Multi-Provider & Custom API Key Settings** — restored interactive provider selection and custom API key configuration in `SettingsDialog`.
- ✅ **Dynamic Model Routing** — resolved deprecated model 410 error by routing queries dynamically via `provider.defaultModel`.
- ✅ **Fixed multi-conversation message caching bug** — keyed `ChatViewModel.getMessages` by `conversationId` using `ConcurrentHashMap`.
- ✅ **Added unit testing suite** — added `ChatViewModelTest` verifying state flow isolation across conversation IDs and UI state changes.

### v3.1.2
- ✅ **Fixed network connectivity** — added `ACCESS_NETWORK_STATE` permission to `AndroidManifest.xml`
- ✅ **Forced SSL** — disabled insecure cleartext traffic
- ✅ **Bumped read timeout** — increased network client timeout to 120s

### v3.1.0
- ✅ **Removed local proxy server dependency** — app calls providers directly
- ✅ **Auto-launch** — app opens directly into a new chat on startup
- ✅ **System prompt upgraded** — Red Team AI persona with offensive security capabilities

---

<p align="center">
  Created with ❤️ by <a href="https://github.com/gailowilly649-linux"><b>gailowilly649-linux</b></a>
</p>
