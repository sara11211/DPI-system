import logging
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from tqdm import tqdm

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("Initializing WebDriver...")
driver = webdriver.Chrome()  
driver.maximize_window()
logger.info("WebDriver initialised and window maximized.")

url = "http://localhost:4200/login"
logger.info(f"Navigating to {url}...")

with tqdm(total=7, desc="Test Progress", bar_format="{l_bar}{bar}| {n_fmt}/{total_fmt}") as progress_bar:
    try:

        driver.get(url)
        logger.info(f"Opened URL: {url}")
        progress_bar.update(1)
        time.sleep(1)  
        logger.info("Waiting for 'Patient' button to be clickable...")
        patient_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.ID, "btn-1"))
        )
        patient_button.click()
        logger.info("Clicked on 'Patient' button.")
        progress_bar.update(1)
        time.sleep(1)

        logger.info("Waiting for 'Suivant' button to be clickable...")
        next_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.ID, "btn-2"))
        )
        next_button.click()
        logger.info("Clicked on 'Suivant' button.")
        progress_bar.update(1)
        time.sleep(1)

        logger.info("Waiting for NSS input field to be visible...")
        nss_input = WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.ID, "nss"))
        )
        nss_input.send_keys("123456789123")
        logger.info("Entered NSS value.")
        progress_bar.update(1)
        time.sleep(1)

        logger.info("Waiting for password field to be visible...")
        password_input = WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.ID, "password"))
        )
        password_input.send_keys("password")
        logger.info("Entered password value.")
        progress_bar.update(1)
        time.sleep(1)

        logger.info("Waiting for 'Login' button to be clickable...")
        login_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.ID, "login-button"))
        )
        login_button.click()
        logger.info("Clicked on 'Login' button.")
        progress_bar.update(1)
        time.sleep(1)

        logger.info("Waiting for the confirmation of the current user...")
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.ID, "welcome-message"))
        )
        welcome_message = driver.find_element(By.ID, "welcome-message").text
        assert "Bonjour Test" in welcome_message, f"Expected 'Bonjour Test' but got '{welcome_message}'"
        logger.info(f"Login successful! Current User: Testeur")
        progress_bar.update(1)
        
    except TimeoutException:
        logger.error("An element could not be found or did not load in time.")
    except AssertionError as ae:
        logger.error(f"Assertion failed: {ae}")
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
    finally:
        logger.info("Test completed. Closing the browser...")
        driver.quit()
        logger.info("Browser closed.")
