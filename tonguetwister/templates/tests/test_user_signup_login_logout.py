import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class SignupLoginLogoutTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()

    def test_signup_login_logout(self):
        self.driver.get("http://127.0.0.1:8000/")

        self.driver.find_element(By.LINK_TEXT, "Rejestracja").click()
        self.driver.find_element(By.NAME, "username").send_keys("testuser")
        self.driver.find_element(By.NAME, "email").send_keys("test@user.com")
        self.driver.find_element(By.NAME, "password1").send_keys("password123")
        self.driver.find_element(By.NAME, "password2").send_keys("password123")
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        self.driver.find_element(By.ID, "back-registration").click()

        self.driver.find_element(By.LINK_TEXT, "Logowanie").click()
        self.driver.find_element(By.NAME, "username").send_keys("testuser")
        self.driver.find_element(By.NAME, "password").send_keys("password123")
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.LINK_TEXT, "Wyloguj"))
        )
        self.driver.find_element(By.LINK_TEXT, "Wyloguj").click()

    def test_signup_login_logout_mobile(self):
        self.driver.get("http://127.0.0.1:8000/")
        self.driver.set_window_size(375, 667)

        self.driver.find_element(By.CSS_SELECTOR, "a[aria-label='register']").click()
        self.driver.find_element(By.NAME, "username").send_keys("mobileuser")
        self.driver.find_element(By.NAME, "email").send_keys("test@user.com")
        self.driver.find_element(By.NAME, "password1").send_keys("password123")
        self.driver.find_element(By.NAME, "password2").send_keys("password123")
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        self.driver.find_element(By.ID, "back-registration").click()

        self.driver.find_element(By.CSS_SELECTOR, "a[aria-label='login']").click()
        self.driver.find_element(By.NAME, "username").send_keys("mobileuser")
        self.driver.find_element(By.NAME, "password").send_keys("password123")
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        WebDriverWait(self.driver, 5).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "a[aria-label='logout']"))
        )
        self.driver.find_element(By.CSS_SELECTOR, "a[aria-label='logout']").click()

    def tearDown(self):
        self.driver.quit()
