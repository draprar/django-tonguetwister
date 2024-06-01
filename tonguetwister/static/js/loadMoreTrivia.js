document.addEventListener('DOMContentLoaded', function() {
    let loadMoreBtn = document.getElementById('load-more-trivia-btn');
    let offset = parseInt(loadMoreBtn.getAttribute('data-offset'));
    let url = loadMoreBtn.getAttribute('data-url');

    loadMoreBtn.addEventListener('click', function() {
        $.ajax({
            url: url,
            data: { 'offset': offset },
            dataType: 'json',
            success: function(data) {
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        $('#trivia-container').append('<div class="one-trivia col-md-16 fs-4">' + data[i].text + '</div>');
                    }
                    offset += data.length;
                } else {
                    $('#load-more-trivia-btn').hide();
                }
            }
        });
    });

    function changeTriviaButtonText() {
        var button = document.getElementById("load-more-trivia-btn");
        button.textContent = "Więcej porad";
    }
    document.getElementById("load-more-trivia-btn").onclick = changeTriviaButtonText;
});