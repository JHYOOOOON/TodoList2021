(() => {
    const input = document.querySelector("input");
    const submitBtn = document.querySelector("button");
    const tasks = document.querySelector(".tasks");

    // 할 일 등록
    const handleSubmit = () => {
        if (input.value === "") return;
        console.log(tasks);
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="flex-left close">
            <div class="btn-wrapper">
                <span class="editBtn btn">
                    <i class="far fa-edit"></i>
                </span>
                <span class="deleteBtn btn">
                    <i class="far fa-trash-alt"></i>
                </span>
            </div>
            <p>${input.value}</p>
        </div>
        <span class="checkBtn">
            <i class="far fa-circle"></i>
        </span>
        `;
        tasks.appendChild(li);
        input.value = "";
    };

    // 엔터 눌렀을 때 할 일 등록
    const handleKeyup = (e) => {
        if (e.key === "Enter") handleSubmit();
    };

    // 체크표시
    const handleTaskCheck = (removeTarget) => {
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

    const handleClick = (e) => {
        if (e.target.tagName !== "svg" && e.target.tagName !== "path") return;

        let target = e.target;
        while (target.tagName !== "SPAN") {
            target = target.parentNode;
        }

        if (target.className === "checkBtn") {
            handleTaskCheck(target);
        } else if (target.classList.contains("editBtn")) {
            // 수정버튼 눌렀을 때 동작
            let flexLeft = target.parentNode.parentNode;
            let text = flexLeft.querySelector("p").innerText;
            const input = document.createElement("input");
            input.placeholder = "Write your task";
            input.value = text;
            input.type = "text";
            input.addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    flexLeft.innerHTML = `
                    <div class="btn-wrapper">
                        <span class="editBtn btn">
                            <i class="far fa-edit"></i>
                        </span>
                        <span class="deleteBtn btn">
                            <i class="far fa-trash-alt"></i>
                        </span>
                    </div>
                    <p>${input.value}</p>
                    `;
                }
            });
            flexLeft.innerHTML = "";
            flexLeft.appendChild(input);
        } else if (target.classList.contains("deleteBtn")) {
            // 삭제버튼 눌렀을 때 동작
            let li = target.parentNode;
            while (li.tagName !== "LI") {
                li = li.parentNode;
            }
            let ul = li.parentNode;
            ul.removeChild(li);
        }
    };

    // flex-left 클래스 찾기
    const findFlexLeft = (target) => {
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
        return flexLeft;
    };

    // 수정/삭제 버튼 보이게 설정
    const handleBtnDisplay = (e) => {
        let flexLeft = findFlexLeft(e.target);

        if (flexLeft.classList[1] === "close") {
            flexLeft.classList.replace("close", "open");
        }
    };

    // 수정/삭제 버튼 안 보이게 설정
    const handleBtnRemove = (e) => {
        let flexLeft = findFlexLeft(e.target);

        if (flexLeft.classList[1] === "open") {
            flexLeft.classList.replace("open", "close");
        }
    };

    input.addEventListener("keyup", handleKeyup);
    submitBtn.addEventListener("click", handleSubmit);
    tasks.addEventListener("click", handleClick);
    tasks.addEventListener("mouseover", handleBtnDisplay);
    tasks.addEventListener("mouseout", handleBtnRemove);
})();