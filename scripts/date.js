(() => {
    const date = document.querySelector(".date");
    const month = document.querySelector(".month");
    const year = document.querySelector(".year");
    const day = document.querySelector(".day");

    const today = new Date();
    const dateName = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
    ];

    date.innerText =
        today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    month.innerText =
        today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth();
    year.innerText = today.getFullYear();
    day.innerText = dateName[today.getDay()];
})();