const newFormHandler = async (event) => {
  event.preventDefault();

  const description = document.querySelector("#comment-desc").value.trim();

  if (description) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/post");
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);
