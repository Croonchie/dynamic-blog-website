document.getElementById("post-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const imageInput = document.getElementById("image");
    let imageURL = "";

    // Validate title and content
    if (!title || !content) {
        alert("Title and content cannot be empty!");
        return;
    }

    // Handle image upload if selected
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(imageInput.files[0]);
        reader.onload = function () {
            imageURL = reader.result;
            savePost(title, content, imageURL);
        };
    } else {
        savePost(title, content, imageURL);
    }
});

function savePost(title, content, imageURL) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    const newPost = {
        title,
        content,
        image: imageURL,
        createdAt: new Date().toISOString()
    };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Post saved successfully!");
    window.location.href = "index.html"; // Redirect back to homepage
}

