// ==========================================
// IKIGAI 2026 THEME SYSTEM
// ==========================================


// Get previously selected theme
const savedTheme =
    localStorage.getItem("ikigai-theme");


// Check user's system preference
const prefersLight =
    window.matchMedia(
        "(prefers-color-scheme: light)"
    ).matches;


// Decide initial theme
const initialTheme =
    savedTheme ||
    (prefersLight ? "light" : "dark");


// Apply theme immediately
document.documentElement.setAttribute(
    "data-theme",
    initialTheme
);


// ==========================================
// WAIT FOR PAGE TO LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );


        // Stop if page has no theme button
        if (!themeToggle) {
            return;
        }


        // Display correct icon
        updateThemeButton();


        // ==================================
        // THEME BUTTON CLICK
        // ==================================

        themeToggle.addEventListener(
            "click",
            () => {

                const currentTheme =
                    document.documentElement
                        .getAttribute(
                            "data-theme"
                        );


                const newTheme =
                    currentTheme === "dark"
                        ? "light"
                        : "dark";


                // Apply new theme
                document.documentElement
                    .setAttribute(
                        "data-theme",
                        newTheme
                    );


                // Save preference
                localStorage.setItem(
                    "ikigai-theme",
                    newTheme
                );


                // Update button
                updateThemeButton();

            }
        );


        // ==================================
        // UPDATE BUTTON
        // ==================================

        function updateThemeButton() {

            const currentTheme =
                document.documentElement
                    .getAttribute(
                        "data-theme"
                    );


            if (currentTheme === "dark") {

                themeToggle.innerHTML = `

                    <span class="theme-icon">
                        ☀
                    </span>

                    <span class="theme-text">
                        Light
                    </span>

                `;


                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light theme"
                );

            }

            else {

                themeToggle.innerHTML = `

                    <span class="theme-icon">
                        ☾
                    </span>

                    <span class="theme-text">
                        Dark
                    </span>

                `;


                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark theme"
                );

            }

        }

    }
);