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

        if (removeTarget.tagName === "path") removeTarget = removeTarget.parentNode;

        let parentLi = removeTarget.parentNode;
        parentLi.removeChild(removeTarget);

        const i = document.createElement("i");
        if (parentLi.className === "done") {
            parentLi.className = "";
            i.className = "far fa-circle";
        } else {
            parentLi.className = "done";
            i.className = "fas fa-check-circle";
        }
        parentLi.appendChild(i);
    };

    input.addEventListener("keyup", handleKeyup);
    submitBtn.addEventListener("click", handleSubmit);
    tasks.addEventListener("click", handleTaskCheck);
})();