from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()  
driver.maximize_window()

try:
    driver.get("http://localhost:4200/admin/nouveau-dossier")  

    save_button = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Sauvegarder')]"))
    )
    save_button.click()

    popup = WebDriverWait(driver, 20).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "popup"))
    )

    popup_text = popup.text
    assert "succès" in popup_text, "Popup does not contain 'succès'"
    print("Test passed: 'succès'")

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    driver.quit()
