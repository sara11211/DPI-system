from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

driver.get("http://localhost:4200/login")

username_field = driver.find_element(By.ID, "nss")
password_field = driver.find_element(By.ID, "password")

username_field.send_keys("123456789123")
password_field.send_keys("azerty1234")

login_button = driver.find_element(By.ID, "login-btn")
login_button.click()

welcome_message = driver.find_element(By.ID, "welcome-message")
assert "Welcome, testuser!" in welcome_message.text

driver.quit()