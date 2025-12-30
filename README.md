# JobNest

JobNest is a job application tracking application built to help users manage and organize their job applications in a simple and efficient way.

The project is split into two parts:
- A frontend built with Next.js
- A backend API built with NestJS

---

## Main Features

- Create job applications
- Track application status (applied, interview, offer, rejected)
- Edit notes directly inside each application
- Delete applications with explicit permanent confirmation
- Filter applications by status
- Search applications by company or role
- Light and dark mode
- Server-side data fetching on initial load

---

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- CSS Variables (for theming)
- Fetch API for backend communication

### Backend

- NestJS
- TypeScript
- REST API
- CRUD operations for job applications

---

## Styling

The UI is built using Tailwind CSS for layout, spacing and component structure.

CSS variables are used specifically for colors and theme values (light and dark mode).  
This approach keeps styles consistent, avoids duplication of dark mode classes and improves cross-browser behavior.

---

## Project Structure

### Frontend

frontend/
- src/app
- src/components
- src/services
- src/types

### Backend

backend/
- src/app
- src/applications
- src/dto

---

## Requirements

- Node.js 18 or higher
- npm or pnpm
- Backend and frontend must run separately

---

## Running the Project Locally

1. Clone the repository
2. Install dependencies in both frontend and backend folders
3. Start the backend server
4. Start the frontend development server

The backend runs on port 3001  
The frontend runs on port 3000

---

## Data Flow

- The frontend fetches application data from the NestJS backend
- Initial data is loaded server-side in Next.js
- All create, update and delete actions are sent to the backend API
- UI state updates immediately after successful API responses

---

## Dark Mode

- Controlled via a toggle in the UI
- Preference is stored in localStorage
- System preference is respected on first load
- Implemented using a single "dark" class on the HTML element

---

## Deployment Notes

- Frontend can be deployed to platforms like Vercel or similar
- Backend can be deployed as a standalone Node.js service
- API base URL should be updated for production environments

---

## Possible Future Improvements

- Authentication and user accounts
- Multi-user support
- Database persistence with Prisma
- Pagination and sorting
- Improved accessibility
- UI animations

---

## Purpose

This project was built as a learning and portfolio project, focusing on:
- Clean frontend architecture
- Client/server separation
- Real-world CRUD workflows
- Practical UI/UX decisions
