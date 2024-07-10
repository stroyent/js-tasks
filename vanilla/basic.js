window.onload = function() {
    function makeDiv() {
        const div = document.createElement('div');
        div.id = 'div1';
        div.style.width = "300px";
        div.style.height = "300px";
        div.style.position = 'absolute';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.margin = "-150px 0 0 -150px";
        div.style.backgroundColor = randomRGB();
        div.innerHTML = "This is a div.";
        div.style.display = "flex";
        div.style.flexFlow = "wrap";
        div.style.placeContent = "center";
        div.style.transition = "all 1s";
        div.style.transform = "scale(1)";
        return div;
    }
    
    
    function randomRGB() {
        let red, green, blue;
        const MAX_COLOR_VALUE = 255;
        red = Math.floor(Math.random() * MAX_COLOR_VALUE);
        green = Math.floor(Math.random() * MAX_COLOR_VALUE);
        blue = Math.floor(Math.random() * MAX_COLOR_VALUE);
        return `rgb(${red} ${green} ${blue})`;
    }

    function changeElement(id) {
        let element = document.getElementById(id);
        
        element.style.transition = "all 1s";
        angle = angle + 90;
        element.style.backgroundColor = randomRGB();
        element.style.transform = element.style.transform.split(' ')[0] + ` rotate(${angle}deg)`;

        if (angle === 360) {
            setTimeout(() => {
            element.style.transition = "all 0s";
            angle = 0;
            element.style.transform = element.style.transform.split(' ')[0] + ` rotate(${angle}deg)`;
            }, 0);
        }
    }

    const div = makeDiv();
    document.body.append(div);
    
    let angle = 0;
    
    setInterval(() => {
        changeElement(div.id);
        div.addEventListener("mouseenter", () => {
            div.style.transform = "scale(1.2)" + ` rotate(${angle}deg)`;
        });
        div.addEventListener("mouseleave", () => {
            div.style.transform = "scale(1)" + ` rotate(${angle}deg)`;
        });
    }, 1000);
}

