const notesDiv = document.getElementById("notes");
const form = document.getElementById("noteForm");


async function fetchNotes() {
  const res = await fetch("http://localhost:5500/api/notes");
  const notes = await res.json();

  notesDiv.innerHTML = "";

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content || ""}</p>
      ${
        note.file
          ? note.file.endsWith(".pdf")
            ? `<a href="http://localhost:5500/${note.file}" target="_blank">View PDF</a>`
            : `<img src="http://localhost:5500/${note.file}" />`
          : ""
      }
      <button onclick="deleteNote('${note._id}')">Delete</button>
    `;

    notesDiv.appendChild(div);
  });
}

fetchNotes();


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  if (file.files[0]) {
    formData.append("file", file.files[0]);
  }

  await fetch("http://localhost:5500/api/notes", {
    method: "POST",
    body: formData
  });

  form.reset();
  fetchNotes();
});


async function deleteNote(id) {
  await fetch(`http://localhost:5500/api/notes/${id}`, {
    method: "DELETE"
  });

  fetchNotes();
}
