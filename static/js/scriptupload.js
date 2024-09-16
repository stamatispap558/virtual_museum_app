
const form = document.getElementById("form");

form.addEventsListener("submit", submitForm);

function submitForm(e) {
    e.prEventsDefault();
    const files = document.getElementById("files");
    const formData = new FormData();
        for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    fetch("http://localhost:9999/upload_files", {
        method: 'post',
        body: formData
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
}