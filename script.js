document.addEventListener('DOMContentLoaded', function() {
  const preferencesForm = document.querySelector('form');

  // Load preferences from cookies
  loadPreferences();

  // Handle form submission
  preferencesForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const fontSizeInput = document.getElementById('fontsize');
    const fontColorInput = document.getElementById('fontcolor');

    const fontSize = fontSizeInput.value;
    const fontColor = fontColorInput.value;

    // Update CSS variables with user preferences
    document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
    document.documentElement.style.setProperty('--fontcolor', fontColor);

    // Save preferences to cookies
    savePreferences(fontSize, fontColor);
  });

  // Function to load preferences from cookies
  function loadPreferences() {
    const fontSize = getCookie('fontsize');
    const fontColor = getCookie('fontcolor');

    if (fontSize && fontColor) {
      // Update form inputs with saved preferences
      document.getElementById('fontsize').value = fontSize;
      document.getElementById('fontcolor').value = fontColor;

      // Apply saved preferences to the page
      document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
      document.documentElement.style.setProperty('--fontcolor', fontColor);
    }
  }

  // Function to save preferences to cookies
  function savePreferences(fontSize, fontColor) {
    setCookie('fontsize', fontSize, 365);
    setCookie('fontcolor', fontColor, 365);
  }

  // Function to set cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";";
  }

  // Function to get cookie
  function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = document.cookie;
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
    //   while (cookie.charAt(0) === ' ') {
    //     cookie = cookie.substring(1);
		  console.log("cookie",cookie)
    //   }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }
});
