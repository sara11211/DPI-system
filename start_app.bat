@echo off

REM Navigate to the backend folder and start the server
echo Starting backend...
cd backend
python -m venv env
call env\Scripts\activate
pip install -r requirements.txt
start cmd /k python manage.py runserver

REM Navigate back to the root and then to the frontend folder to start the app
cd ..
cd frontend
echo Starting frontend...
start cmd /k "npm install && npm run start"
