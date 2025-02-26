VersaCalc
VersaCalc is a modern, versatile calculator application built with React. It offers both standard and scientific modes, complete with memory functions, calculation history, multiple themes, keyboard support, and a responsive design that adapts perfectly to any screen. Whether you need basic arithmetic or advanced mathematical functions, VersaCalc has you covered.

Features
Standard Calculator Mode

Basic arithmetic operations: addition, subtraction, multiplication, and division.
Responsive display that updates dynamically.
Clear Entry and All Clear functions.
Scientific Calculator Mode

Toggle between standard and scientific modes.
Advanced mathematical functions (sin, cos, tan, log, sqrt, exponentiation).
Support for parentheses and complex expressions.
Safe expression evaluation using mathjs.
Memory Functions

M+: Memory Add.
M-: Memory Subtract.
MR: Memory Recall.
MC: Memory Clear.
Calculation History

Slide-up history panel that displays past calculations.
Automatic saving of all operations for quick reference.
Themes

Multiple themes (Dark, Light, Blue) that affect the entire app.
Instant theme switching for a personalized experience.
Keyboard Support

Full support for numeric and operator input via keyboard.
Enhanced usability for power users.
Responsive Design

Layout and buttons resize automatically to fit the screen.
Optimized for both mobile and desktop devices.
Smooth Animations

Subtle button press animations and transitions.
Seamless mode toggling and history panel effects.
Demo
Include a screenshot or GIF here to showcase VersaCalc in action.
Example:


Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
Node.js (v12 or above recommended)
npm (comes with Node.js)
Installation
Clone the Repository

git clone https://github.com/SaltySalsa12/versacalc.git
cd versacalc
Install Dependencies

Install the necessary packages by running:

npm install
Install Additional Dependencies

This project uses mathjs for safe mathematical expression evaluation:

npm install mathjs
Configure Tailwind CSS (Optional)

If you need to customize your Tailwind CSS configuration, refer to the Tailwind CSS documentation.

Running the Application
Start the development server by running:

npm start
This will launch VersaCalc in development mode. Open http://localhost:3000 in your browser to view the application.

Customization
Changing the App Icon
To change the React app icon:

Prepare your new icon (typically a square PNG file) and generate the required favicon sizes using a tool like RealFaviconGenerator.

Replace the default favicon.ico in the public folder with your new icon.

Update the public/manifest.json file to reference your new icons. For example:

json
Copy
Edit
{
  "short_name": "VersaCalc",
  "name": "VersaCalc - Versatile Calculator",
  "icons": [
    {
      "src": "favicon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "favicon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
Update the <title> in public/index.html if needed.

Further Customizations
Themes: You can modify or extend the theme options in the code by updating the themeClasses object in calculator.js.
Layout: Adjust the flex ratios, grid gaps, or overall layout settings in calculator.js to better fit your design preferences.
Built With
React
Tailwind CSS
mathjs
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Push to your branch and open a pull request.
Please ensure your code follows the existing style guidelines and includes appropriate tests.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or suggestions, please contact:
Your Name - yashspsn@gmail.com
Project Link: https://versacalc.vercel.app
