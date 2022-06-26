const file = document.querySelector("#file");

file.addEventListener("focus", (e) => {
    document.querySelector(".form-control:first-of-type").focus();
});
const handleChange = (e) => {
    const fileName = e.target.value.replace(/C:\\fakepath\\/, "");
    document.getElementById("file_name").textContent = fileName;
};
file.addEventListener("change", handleChange);
file.addEventListener("blur", handleChange);