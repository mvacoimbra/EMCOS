const controls = document.querySelectorAll('.control');
let currentItem = 1;
const items = document.querySelectorAll('.item');
const maxItems = items.length;

controls.forEach((control) => {
    control.addEventListener('click', () => {
        const isLeft = control.classList.contains('arrow-left');

        if (isLeft) {
            currentItem -= 1;
        } else {
            currentItem += 1;
        }

        console.log('control clicked', isLeft, currentItem);

        if (currentItem >= maxItems) {
            currentItem = 1;
        }

        if (currentItem < 1) {
            currentItem = maxItems - 1;
        }

        items.forEach((item) => item.classList.remove('current-item'));

        items[currentItem].scrollIntoView({
            inline: "center",
            behavior: "smooth",
            block: "nearest"
        });

        items[currentItem].classList.add("current-item");
    });
});

