# Patient Electronic Medical Record Management System

A web application for managing **Electronic Medical Records** and patient medical information. The system is designed for healthcare professionals, including doctors, pharmacists, nurses, radiologists, and technicians, as well as administrative staff. 

## Project Structure

The project is organized into three main directories:

```text
DPI-system/
├── frontend/    # Angular frontend application
├── backend/     # Django backend application
└── tests/       # Frontend and backend tests
```

## Technologies

* **Frontend:** Angular
* **Backend:** Django
* **Database:** MySQL
* **Testing:** Postman, Selenium
* **API Documentation:** Swagger
* **Angular Documentation:** Compodoc

## Prerequisites

Make sure the following are installed before running the project:

* [Node.js](https://nodejs.org/) and npm
* Python and pip
* Angular CLI
* Django

Install Angular CLI:

```bash
npm install -g @angular/cli
```

Install Django:

```bash
pip install django
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/sara11211/DPI-system.git
cd DPI-system
```

### 2. Configure environment variables

Create or configure the `.env` file located in the `backend/` directory.

The environment variables should contain the required configuration for connecting to the MySQL database.

### 3. Start the application

On Windows, run the `start_app.bat` script from the project root:

```powershell
.\start_app.bat
```

Once the application is running, open:

```text
http://localhost:4200
```

## Database

The application uses **MySQL** as its database management system.

The required database access configuration should be provided through the environment variables in the backend `.env` file.

## Testing

Tests for both the frontend and backend are located in the `tests/` directory.

Navigate to the directory and run the appropriate test scripts:

```bash
cd tests
```

Testing tools used in the project include:

* **Postman** for API testing
* **Selenium** for automated web testing

## API Documentation

The backend API documentation is generated using **Swagger**.

Once the Django backend is running, access the documentation at:

```text
http://127.0.0.1:8000/swagger/
```

## Angular Documentation

The Angular project documentation is generated using **Compodoc**.

Run:

```bash
compodoc -s
```

Then open:

```text
http://127.0.0.1:8080/
```
