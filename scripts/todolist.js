(() => {
    const input = document.querySelector("input");
    const submitBtn = document.querySelector("button");
    const tasks = document.querySelector(".tasks");

    const handleSubmit = () => {
        if (input.value === "") return;
        console.log(tasks);
        const li = document.createElement("li");
        li.innerHTML = `
            <p>${input.value}</p>
            <i class="far fa-circle"></i></li>
        `;
        tasks.appendChild(li);
        input.value = "";
    };

    const handleKeyup = (e) => {
        if (e.key === "Enter") handleSubmit();
    };

    const handleTaskCheck = (e) => {
        if (e.target.tagName !== "svg" && e.target.tagName !== "path") return;

        let removeTarget = e.target;
        while (removeTarget.className !== "checkBtn") {
            removeTarget = removeTarget.parentNode;
        }

        let parentLi = removeTarget.parentNode;
        parentLi.removeChild(removeTarget);

        const span = document.createElement("span");
        span.className = "checkBtn";
        const i = document.createElement("i");
        if (parentLi.className === "done") {
            parentLi.className = "";
            i.className = "far fa-circle";
        } else {
            parentLi.className = "done";
            i.className = "fas fa-check-circle";
        }
        span.appendChild(i);
        parentLi.appendChild(span);
    };

    const handleBtnDisplay = (e) => {
        let target = e.target;
        let flexLeft;
        if (target.tagName === "LI") {
            flexLeft = target.childNodes[1];
        } else {
            flexLeft = target;
            while (
                flexLeft.className === "" ||
                !flexLeft.classList.contains("flex-left")
            ) {
                if (flexLeft.tagName === "LI") break;
                flexLeft = flexLeft.parentNode;
            }
            if (flexLeft.tagName === "LI") {
                flexLeft = flexLeft.childNodes[1];
            }
        }

        if (flexLeft.classList[1] === "close") {
            flexLeft.classList.replace("close", "open");
        }
    };

    const handleBtnRemove = (e) => {
        let target = e.target;
        let flexLeft;
        if (target.tagName === "LI") {
            flexLeft = target.childNodes[1];
        } else {
            flexLeft = target;
            while (
                flexLeft.className === "" ||
                !flexLeft.classList.contains("flex-left")
            ) {
                if (flexLeft.tagName === "LI") break;
                flexLeft = flexLeft.parentNode;
            }
            if (flexLeft.tagName === "LI") {
                flexLeft = flexLeft.childNodes[1];
            }
        }
        if (flexLeft.classList[1] === "open") {
            flexLeft.classList.replace("open", "close");
        }
    };

    input.addEventListener("keyup", handleKeyup);
    submitBtn.addEventListener("click", handleSubmit);
    tasks.addEventListener("click", handleTaskCheck);
    tasks.addEventListener("mouseover", handleBtnDisplay);
    tasks.addEventListener("mouseout", handleBtnRemove);
})();