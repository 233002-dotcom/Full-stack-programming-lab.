$(document).ready(function() {
    const images = [
        { src: "https://picsum.photos/id/10/400/300", caption: "Forest Lake" },
        { src: "https://picsum.photos/id/11/400/300", caption: "Rocky Mountain" },
        { src: "https://picsum.photos/id/12/400/300", caption: "Sunny Beach" },
        { src: "https://picsum.photos/id/13/400/300", caption: "City Skyline" },
        { src: "https://picsum.photos/id/14/400/300", caption: "Desert Dunes" }
    ];

    let currentIndex = 0;

    function updateGallery(index) {
        $("#currentImage").fadeOut(500, function() {
            $(this).attr("src", images[index].src).fadeIn(500);
            $("#caption").text(images[index].caption);
        });
    }

    $("#nextBtn").click(function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery(currentIndex);
    });

    $("#prevBtn").click(function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery(currentIndex);
    });
});
