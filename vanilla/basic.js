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
        angle = (angle + 90) % 720;
        let element = document.getElementById(id);
        element.style.backgroundColor = randomRGB();
        element.style.transform = `rotate(${angle}deg)`;
    }


    const div = makeDiv();
    document.body.append(div);
    let angle = 0;
    setInterval(() => changeElement(div.id), 1000);
}

