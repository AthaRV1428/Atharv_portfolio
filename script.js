document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    /* Mobile menu */

    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        menuBtn.textContent = navLinks.classList.contains("active")
            ? "✕"
            : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuBtn.textContent = "☰";
        });
    });

    /* 3D card tilt */

    const tiltCards = document.querySelectorAll(".tilt-card");

    tiltCards.forEach(function (card) {
        card.addEventListener("mousemove", function (event) {
            if (window.innerWidth <= 800) {
                return;
            }

            const box = card.getBoundingClientRect();

            const x = event.clientX - box.left;
            const y = event.clientY - box.top;

            const centerX = box.width / 2;
            const centerY = box.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform =
                "perspective(900px) rotateX(" +
                rotateX +
                "deg) rotateY(" +
                rotateY +
                "deg) translateY(-8px)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });
    });

    /* XP system */

    let xp = 0;
    let level = 2;

    const hud = document.createElement("div");

    hud.className = "gaming-hud";

    hud.innerHTML = `
        <div class="hud-heading">
            <span>PLAYER PROFILE</span>
            <strong>● ONLINE</strong>
        </div>

        <div class="hud-level">
            <span id="hudLevel">LVL 02</span>
            <span id="hudXP">0 / 100 XP</span>
        </div>

        <div class="hud-bar">
            <div id="hudProgress"></div>
        </div>

        <div class="hud-quest">
            <small>ACTIVE QUEST</small>
            <p id="hudQuest">Explore Atharv's portfolio</p>
        </div>
    `;

    document.body.appendChild(hud);

    const hudLevel = document.getElementById("hudLevel");
    const hudXP = document.getElementById("hudXP");
    const hudProgress = document.getElementById("hudProgress");
    const hudQuest = document.getElementById("hudQuest");

    function showNotification(message) {
        const notification = document.createElement("div");

        notification.className = "xp-notification";
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(function () {
            notification.classList.add("show");
        }, 50);

        setTimeout(function () {
            notification.classList.remove("show");

            setTimeout(function () {
                notification.remove();
            }, 400);
        }, 2200);
    }

    function addXP(amount) {
        xp += amount;

        if (xp >= 100) {
            xp -= 100;
            level++;

            showNotification("LEVEL UP! LEVEL " + level);
        }

        hudLevel.textContent =
            "LVL " + String(level).padStart(2, "0");

        hudXP.textContent = xp + " / 100 XP";
        hudProgress.style.width = xp + "%";
    }

    /* Project quest buttons */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {
        const questButton = card.querySelector(".quest-btn");

        questButton.addEventListener("click", function () {
            const projectName =
                card.querySelector("h3").textContent;

            addXP(20);

            hudQuest.textContent = "Completed: " + projectName;
            questButton.textContent = "Quest Completed ✓";

            showNotification("+20 XP  QUEST COMPLETED");
        });
    });

    /* Active navigation */

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll("#navLinks a");

    window.addEventListener("scroll", function () {
        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navItems.forEach(function (item) {
            item.classList.remove("active-link");

            if (item.getAttribute("href") === "#" + currentSection) {
                item.classList.add("active-link");
            }
        });

        if (currentSection === "about") {
            hudQuest.textContent = "Discover Atharv's story";
        } else if (currentSection === "skills") {
            hudQuest.textContent = "Inspect skill abilities";
        } else if (currentSection === "projects") {
            hudQuest.textContent = "Explore project quests";
        } else if (currentSection === "education") {
            hudQuest.textContent = "Review education progress";
        } else if (currentSection === "contact") {
            hudQuest.textContent = "Start a collaboration";
        }
    });

    /* Floating particles */

    for (let i = 0; i < 35; i++) {
        const particle = document.createElement("span");

        particle.className = "floating-particle";

        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 8 + "s";
        particle.style.animationDuration =
            5 + Math.random() * 8 + "s";

        document.body.appendChild(particle);
    }
});