# Personal Notes App

A **Personal Notes App** built with React and Vite. This app allows users to create, view, edit, archive, and delete notes. It also supports localization (English and Indonesian) and light/dark themes.

## Demo

To see the app in action, follow the [Installation](#installation) steps to run it locally on your machine.

## Features

- **Authentication**: Login and register functionality.
- **Create Notes**: Add new notes with a title and body.
- **View Notes**: View active and archived notes.
- **Search Notes**: Search notes by title or body.
- **Archive/Unarchive Notes**: Archive notes to keep your active list clean and unarchive them when needed.
- **Delete Notes**: Permanently delete notes.
- **Localization**: Switch between English and Indonesian languages.
- **Theme Support**: Toggle between light and dark themes.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/personal-notes-app.git
   cd personal-notes-app

2. Install dependencies
   npm install
4. Start the development server
   npm run dev
5. Open the app in your browser at http://localhost:5173.

## Usage
1. Login/Register: Start by registering a new account or logging in with an existing one.
2. Create Notes: Use the "Add Note" button to create a new note.
3. View Notes: View your active notes on the homepage or archived notes in the "Archived" section.
4. Search Notes: Use the search bar to find notes by title or body.
5. **Manage Notes:**
   - Archive notes to move them to the archived section.
   - Unarchive notes to move them back to the active section.
   - Delete notes to permanently remove them.
6. Localization: Switch between English and Indonesian using the language toggle in the navigation menu.
7. Theme: Toggle between light and dark themes using the theme switcher in the navigation menu.
  
## Technology Used
### Frontend:
- React: A JavaScript library for building user interfaces.
- React Router: For routing and navigation.
- React Icons: For icons.
### Build Tool:
- Vite: A fast build tool for modern web projects.
- Styling:
- CSS with custom variables for theming.
- State Management:
- React Context API for managing locale and theme.
### API:
- Dicoding Notes API: For managing notes and authentication.

## Folder Structure
```bash
src/
├── components/       # Reusable components (e.g., buttons, forms, navigation)
├── context/          # Context for Locale and Theme
├── hooks/            # Custom hooks (e.g., useAuth)
├── pages/            # Page components (e.g., HomePage, LoginPage)
├── styles/           # CSS styles
├── utils/            # Utility functions (e.g., API calls, date formatting)
