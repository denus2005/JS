console.log("Функція triangle(value1, type1, value2, type2) обчислює сторони та кути прямокутного трикутника.");
console.log("type може бути: 'leg' (катет), 'hypotenuse' (гіпотенуза), 'adjacent angle' (прилеглий кут), 'opposite angle' (протилежний кут), 'angle' (гострий кут при гіпотенузі).");
console.log("Використовувати градуси для кутів. Результат виводиться в консоль.");



function triangle(value1, type1, value2, type2) {
    
    const degToRad = deg => deg * Math.PI / 180;
    const radToDeg = rad => rad * 180 / Math.PI;

    let a, b, c, alpha, beta;

    
    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Некоректний тип аргументу. Перечитайте інструкцію.");
        return "failed";
    }

    
    if (value1 <= 0 || value2 <= 0) {
        console.log("Значення сторін або кутів повинні бути більше нуля.");
        return "failed";
    }

    
    try {
        if ((type1 === "leg" && type2 === "leg") || (type1 === "leg" && type2 === "leg")) {
            a = value1;
            b = value2;
            c = Math.sqrt(a*a + b*b);
            alpha = radToDeg(Math.asin(a/c));
            beta = 90 - alpha;
        }
        else if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
            if (type1 === "leg") { a = value1; c = value2; }
            else { a = value2; c = value1; }
            if (a >= c) {
                console.log("Катет не може бути більший або рівний гіпотенузі.");
                return "failed";
            }
            b = Math.sqrt(c*c - a*a);
            alpha = radToDeg(Math.asin(a/c));
            beta = 90 - alpha;
        }
        else if ((type1.includes("angle") && type2 === "leg") || (type2.includes("angle") && type1 === "leg")) {
            let angleDeg = type1.includes("angle") ? value1 : value2;
            let legVal = type1 === "leg" ? value1 : value2;

            if (angleDeg <= 0 || angleDeg >= 90) {
                console.log("Гострий кут має бути менше 90 градусів.");
                return "failed";
            }

            alpha = type1.includes("angle") ? angleDeg : angleDeg;
            let angleRad = degToRad(alpha);

            if (type1 === "leg") {
                a = legVal;
                b = a / Math.tan(angleRad);
            } else {
                b = legVal;
                a = b * Math.tan(angleRad);
            }
            c = Math.sqrt(a*a + b*b);
            beta = 90 - alpha;
        }
        else {
            console.log("Ця комбінація аргументів не підтримується або некоректна.");
            return "failed";
        }

        console.log(`a (катет) = ${a.toFixed(2)}`);
        console.log(`b (катет) = ${b.toFixed(2)}`);
        console.log(`c (гіпотенуза) = ${c.toFixed(2)}`);
        console.log(`alpha (°) = ${alpha.toFixed(2)}`);
        console.log(`beta (°) = ${beta.toFixed(2)}`);
        return "success";

    } catch (error) {
        console.log("Виникла помилка при обчисленнях:", error);
        return "failed";
    }
}
