document.addEventListener('DOMContentLoaded', function() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    function handleToggleButtonClick(event) {
        const button = event.target.closest('.toggle-exercise-btn');
        if (!button || button.disabled) return;

        const exerciseId = button.dataset.id;
        const action = button.textContent.trim();
        button.disabled = true;

        if (action === 'Dodaj do powtórek') {
            fetch(`/add-exercise/${exerciseId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                button.disabled = false;
                if (data.status === 'Exercise added') {
                    button.disabled = true;
                    button.textContent = 'W powtórkach 😄';
                    button.classList.replace('btn-success', 'btn-secondary');
                }
            })
            .catch(error => {
                button.disabled = false;
            });
        } else if (action === 'W powtórkach 😄') {
            button.disabled = true;
        }
    }

    function addExerciseToDOM(exercise, isAuthenticated) {
        if (document.getElementById(`exercise-${exercise.id}`)) {
            return;
        }

        const exerciseContainer = document.createElement('div');
        exerciseContainer.id = `exercises-container-${exercise.id}`;
        exerciseContainer.classList.add('exercises-container', 'col-md-16', 'fs-4');

        const exerciseDiv = document.createElement('div');
        exerciseDiv.classList.add('exercise');
        exerciseDiv.textContent = exercise.text;
        exerciseDiv.id = `exercise-${exercise.id}`;

        exerciseContainer.appendChild(exerciseDiv);

        if(isAuthenticated) {
            const button = document.createElement('button');
            button.classList.add('btn', 'toggle-exercise-btn');
            button.dataset.id = exercise.id;
            button.textContent = exercise.is_added ? 'W powtórkach 😄' : 'Dodaj do powtórek';
            button.classList.add(exercise.is_added ? 'btn-secondary' : 'btn-success');
            button.disabled = exercise.is_added;

            button.addEventListener('click', handleToggleButtonClick);

            exerciseContainer.appendChild(button);
        }

        document.getElementById('exercises-container').appendChild(exerciseContainer);
    }

    const exercisesContainer = document.getElementById('exercises-container');
    if (exercisesContainer) {
        exercisesContainer.addEventListener('click', function(event) {
            if (event.target.matches('.toggle-exercise-btn')) {
                handleToggleButtonClick(event);
            }
        });
    }

    let loadMoreBtn = document.getElementById('load-more-exercises-btn');
    let offset, url;
    if (loadMoreBtn) {
        offset = parseInt(loadMoreBtn.getAttribute('data-offset'));
        url = loadMoreBtn.getAttribute('data-url');
        const isAuthenticated = loadMoreBtn.getAttribute('data-authenticated') === 'true';

        loadMoreBtn.addEventListener('click', function() {
            fetch(`${url}?offset=${offset}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('exercises-container').innerHTML = '';

                if (data.length > 0) {
                    data.forEach(exercise => addExerciseToDOM(exercise, isAuthenticated));
                    offset += data.length;
                    loadMoreBtn.setAttribute('data-offset', offset.toString());
                } else {
                    document.getElementById('card-exercises').style.display = 'block';
                    loadMoreBtn.style.display = 'none';

                    const successSound = document.getElementById('success-sound-exercises');
                    successSound.play();

                    if (navigator.vibrate) {
                        navigator.vibrate(200);
                    }

                }
            })
            .catch(error => {
            });
        });
    } else {
        document.querySelectorAll('.delete-exercise-btn').forEach(function(button) {
            button.addEventListener('click', function() {
                const exerciseId = this.getAttribute('data-id');
                fetch(`/delete-exercise/${exerciseId}/`, {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'Exercise deleted') {
                        location.reload();
                    }
                })
                .catch(error => {
                });
            });
        });
    }
});