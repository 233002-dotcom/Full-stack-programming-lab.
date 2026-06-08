$(document).ready(function() {
    $(".tab-btn").click(function() {
        const target = $(this).data("target");

        // Update active button
        $(".tab-btn").removeClass("active");
        $(this).addClass("active");

        // Show/Hide content with animation
        $(".content-section").removeClass("active").fadeOut(300, function() {
            $(target).fadeIn(300).addClass("active");
            
            // Smooth scroll to the target section within the container
            const container = $(".content-container");
            const scrollTo = $(target).position().top + container.scrollTop();
            container.animate({
                scrollTop: scrollTo
            }, 500);
        });
    });
});
