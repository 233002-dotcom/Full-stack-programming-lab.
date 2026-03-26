$(document).ready(function() {
    // Add item to list
    $("#addItemBtn").click(function() {
        const itemText = $("#itemInput").val().trim();
        if (itemText !== "") {
            const listItem = `
                <li>
                    <span>${itemText}</span>
                    <button class="delete-btn">Delete</button>
                </li>
            `;
            $("#itemList").append(listItem);
            $("#itemInput").val(""); // Clear input
        } else {
            alert("Please enter an item!");
        }
    });

    // Remove item from list (using event delegation for dynamic elements)
    $("#itemList").on("click", ".delete-btn", function() {
        $(this).parent().fadeOut(300, function() {
            $(this).remove();
        });
    });

    // Highlight on hover (handled by CSS, but demonstrating jQuery hover as well)
    $("#itemList").on("mouseenter", "li", function() {
        $(this).css("font-weight", "bold");
    }).on("mouseleave", "li", function() {
        $(this).css("font-weight", "normal");
    });
});
