Laboratory Management Application
Overview
This React application provides a comprehensive solution for managing laboratories, devices, schedules, users, and tests. It connects to the OpenLaboratory API (https://api.openlaboratory.fi/api) to handle data storage and retrieval.

Key Features
User Authentication: Login and registration functionality with token-based authentication
Dashboard: Overview of key metrics and quick access to main features
Laboratory Management: Create, view, edit, and delete laboratories
Device Management: Manage devices within laboratories with detailed information
Scheduling System: Calendar-based scheduling for laboratory access
User Management: Manage user accounts with role-based permissions
Testing System: Create and manage tests with questions and multiple-choice answers
Responsive Design: Works on desktop and mobile devices
Project Structure
The application follows a modular architecture with separate components for each feature:

API Layer: Axios-based services for communication with the backend
Context: Global state management for authentication
Components: Reusable UI components organized by feature
Pages: Main application views that combine components
Utilities: Helper functions for dates, formatting, etc.
Technical Stack
React: Frontend library for building the user interface
React Router: For navigation and routing
Axios: HTTP client for API requests
Tailwind CSS: Utility-first CSS framework for styling
Context API: For state management
Getting Started
Clone the repository
Install dependencies with npm install
Configure environment variables if needed
Start the development server with npm start
API Integration
The application integrates with the OpenLaboratory API which provides endpoints for:

User authentication
Lab management
Device tracking
Scheduling
Test and question management
Key Workflows
Laboratory Management
View all laboratories
Create new laboratories
Edit laboratory details
View devices within a laboratory
Add safety guidelines
Device Management
View all devices
Create new devices
Assign devices to laboratories
Add device documentation and pictures
Scheduling
View calendar of lab schedules
Book time slots for lab access
Manage existing bookings
User Management
Register new users
Manage user accounts
View user test results and schedules
Testing System
Create tests with multiple-choice questions
Assign tests to users
Track test results and completions
Future Enhancements
Advanced reporting and analytics
Equipment maintenance tracking
Integration with inventory systems
Mobile application support
Real-time notifications
