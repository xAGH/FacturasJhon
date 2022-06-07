import __init__
from src.app import Application

app = Application.create_app()

if __name__ == '__main__':
    
    try:
        app.run(**app.config["RUN_CONFIG"])

    except Exception as e:
        print(f"Error starting server: {e}")
