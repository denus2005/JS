console.log("Функція triangle(value1, type1, value2, type2) обчислює сторони та кути прямокутного трикутника.");
console.log("type може бути: 'leg' (катет), 'hypotenuse' (гіпотенуза), 'adjacent angle' (прилеглий кут), 'opposite angle' (протилежний кут), 'angle' (гострий кут при гіпотенузі).");
console.log("Використовувати градуси для кутів. Результат виводиться в консоль.");

function triangle(value1, type1, value2, type2) {

    const degToRad = deg => deg * Math.PI / 180;
    const radToDeg = rad => rad * 180 / Math.PI;

    let a, b, c, alpha, beta;

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Некоректний тип аргументу.");
        return "failed";
    }

    if (value1 <= 0 || value2 <= 0 || !isFinite(value1) || !isFinite(value2)) {
        console.log("Значення повинні бути додатніми та скінченними.");
        return "failed";
    }

    try {

        // ----- LEG + LEG -----
        if (type1 === "leg" && type2 === "leg") {
            a = value1;
            b = value2;
            c = Math.hypot(a, b);
            alpha = radToDeg(Math.atan(a / b));
            beta = 90 - alpha;
        }

        // ----- LEG + HYPOTENUSE -----
        else if (
            (type1 === "leg" && type2 === "hypotenuse") ||
            (type2 === "leg" && type1 === "hypotenuse")
        ) {
            a = type1 === "leg" ? value1 : value2;
            c = type1 === "hypotenuse" ? value1 : value2;

            if (a >= c) {
                console.log("Катет не може бути більший або рівний гіпотенузі.");
                return "failed";
            }

            b = Math.sqrt(c * c - a * a);
            alpha = radToDeg(Math.asin(a / c));
            beta = 90 - alpha;
        }

        // ----- HYPOTENUSE + ANY ANGLE -----
        else if (
            (type1 === "hypotenuse" && validTypes.includes(type2) && type2.includes("angle")) ||
            (type2 === "hypotenuse" && validTypes.includes(type1) && type1.includes("angle"))
        ) {
            c = type1 === "hypotenuse" ? value1 : value2;
            let angle = type1.includes("angle") ? value1 : value2;

            if (angle <= 0 || angle >= 90) {
                console.log("Гострий кут має бути між 0 та 90.");
                return "failed";
            }

            alpha = angle;
            beta = 90 - alpha;

            let rad = degToRad(alpha);

            a = c * Math.sin(rad);
            b = c * Math.cos(rad);
        }

        // ----- LEG + ANGLE -----
        else if (
            (type1 === "leg" && type2.includes("angle")) ||
            (type2 === "leg" && type1.includes("angle"))
        ) {
            let leg = type1 === "leg" ? value1 : value2;
            let angle = type1.includes("angle") ? value1 : value2;
            let angleType = type1.includes("angle") ? type1 : type2;

            if (angle <= 0 || angle >= 90) {
                console.log("Гострий кут має бути між 0 та 90.");
                return "failed";
            }

            let rad = degToRad(angle);

            if (angleType === "adjacent angle") {
                b = leg;
                a = b * Math.tan(rad);
            } else if (angleType === "opposite angle") {
                a = leg;
                b = a / Math.tan(rad);
            } else { // "angle"
                a = leg;
                b = a / Math.tan(rad);
            }

            c = Math.hypot(a, b);
            alpha = angle;
            beta = 90 - alpha;
        }

        else {
            console.log("Ця комбінація параметрів не підтримується.");
            return "failed";
        }

        // Перевірка на граничні значення
        if (!isFinite(a) || !isFinite(b) || !isFinite(c)) {
            console.log("Обчислення призвели до некоректного результату.");
            return "failed";
        }

        console.log(`a (катет) = ${a.toFixed(2)}`);
        console.log(`b (катет) = ${b.toFixed(2)}`);
        console.log(`c (гіпотенуза) = ${c.toFixed(2)}`);
        console.log(`alpha (°) = ${alpha.toFixed(2)}`);
        console.log(`beta (°) = ${beta.toFixed(2)}`);

        return "success";

    } catch (error) {
        console.log("Помилка обчислення:", error);
        return "failed";
    }
}
