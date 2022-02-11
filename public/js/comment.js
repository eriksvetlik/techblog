const newFormHandler = async (event) => {
  event.preventDefault();

  const description = document.querySelector("#comment-desc").value.trim();
  const post_id = document.querySelector("#post_id").value;

  if (description) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ description, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);
