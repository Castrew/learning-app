## Learning Appointment Scheduling App

This is a learning project for building a simple web app to schedule appointments at a nail studio. It was created using Next.js, TypeScript, and React, with a backend powered by Drizzle ORM and MySQL. The app allows users to book, view, and manage appointments. Authentication is managed with Lucia auth, and the UI is styled using MUI (Material-UI).

## Table of Contents

- Features
- Tech Stack
- Getting Started
- Prerequisites
- Installation
- Docker Setup
- Running Locally

## Features

- User authentication and management using Lucia Auth
- Book nail studio appointments
- View available appointment slots
- Manage existing bookings (edit/cancel)
- Responsive design with MUI (Material-UI)

## Tech Stack

- Frontend: Next.js, React, TypeScript, MUI (Material-UI)
- Backend: Drizzle ORM with MySQL
- HTTP Client: Axios
- State Management: React Query
- Authentication: Lucia Auth
- Other Tools: Docker

## Getting started

Before you can run the app, you need to install Docker and Node js

Create .env file and paste:

DATABASE_URL = 'mysql://root:password@db:3306/learning_app'

In terminal write these commands:

docker-compose -f docker-compose.db.yml up -d

docker compose -f docker-compose.prod.yml up -d

//Change volumes names if db doesnt start

- Open browser on http://localhost:3000
