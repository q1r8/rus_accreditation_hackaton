# Запуск сервиса
## Необходим python3.8 и Node.js LTS

*   git clone https://github.com/q1r8/rus_accreditation_hackaton.git
*   gut checkout inference

Чтобы загрузить модели и необходимые файлы выполните команды:
*   python3 -m virtualenv venv
*   source venv/bin/activate
*   pip install -r requirements.txt
*   sh load_model.sh
*   cd frontend
*   npm i

# Для запуска фронта
*   npm start

# Для запуска бекенда
*   python app.py
