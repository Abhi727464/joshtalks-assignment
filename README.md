### Documentation

# Task Management Project

## Overview

This **Task Management Task** is a simple tool for managing tasks, allowing users to add, search, edit, mark as pending or completed and delete their tasks.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Install dependencies:

   ```bash
   npm install or yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev or yarn run dev
   ```

## Features

- **Task Creation**: Users can add tasks by providing a title, description, and priority. Tasks are saved in local storage for persistence.
- **Task Management**: Users can view all tasks in a table, with options to edit, delete, and change the status (mark as complete or pending) of each task.
- **Sorting**:Tasks can be sorted by priority by clicking the priority column header in the table.
- **Search Functionality**:A search input allows users to quickly find tasks based on their titles.

## Technologies Used

- **Next/React**: Front-end framework for building the UI.
- **HTML5 and CSS3**: For structuring and styling the web page.
- **JavaScript (ES6+)**: Logic implementation.
- **React Hooks**: For managing state and lifecycle methods.

## Usage

- **Add Tasks**: Enter task details (title, description, priority) and click "Add Task."
- **Manage Tasks**: Use the buttons within each row of the table to edit, delete, or update the task status.
- **Search and Sort**: Filter tasks using the search bar or sort tasks by clicking on the column headers.
