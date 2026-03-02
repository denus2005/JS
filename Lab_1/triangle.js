console.log("Функція triangle(value1, type1, value2, type2) обчислює сторони та кути прямокутного трикутника.");
console.log("type може бути: 'leg' (катет), 'hypotenuse' (гіпотенуза), 'adjacent angle' (прилеглий кут), 'opposite angle' (протилежний кут), 'angle' (гострий кут при гіпотенузі).");
console.log("Використовувати градуси для кутів. Результат виводиться в консоль.");

function triangle(value1, type1, value2, type2) {
    const degToRad = deg => deg * Math.PI / 180;
    const radToDeg = rad => rad * 180 / Math.PI;

    let a, b, c, alpha, beta;

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    // Перевірка типів
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Некоректний тип. Перечитайте інструкцію.");
        return "failed";
    }

    // Перевірка значень
    if (!Number.isFinite(value1) || !Number.isFinite(value2) || value1 <= 0 || value2 <= 0) {
        console.log("Значення повинні бути додатніми та скінченними.");
        return "failed";
    }

    // Функція для перевірки гострого кута
    const checkAngle = ang => ang > 0 && ang < 90;

    try {

        // ----- LEG + LEG -----
        if (type1 === "leg" && type2 === "leg") {
            a = value1; b = value2;
            c = Math.hypot(a, b);
            alpha = radToDeg(Math.asin(a / c));
            beta = 90 - alpha;
        }

        // ----- LEG + HYPOTENUSE -----
        else if ((type1 === "leg" && type2 === "hypotenuse") || (type2 === "leg" && type1 === "hypotenuse")) {
            a = type1 === "leg" ? value1 : value2;
            c = type1 === "hypotenuse" ? value1 : value2;
            if (a >= c) { console.log("Катет не може бути більший або рівний гіпотенузі."); return "failed"; }
            b = Math.sqrt(c*c - a*a);
            alpha = radToDeg(Math.asin(a / c));
            beta = 90 - alpha;
        }

        // ----- HYPOTENUSE + ANGLE (тільки "angle") -----
        else if ((type1 === "hypotenuse" && type2 === "angle") || (type2 === "hypotenuse" && type1 === "angle")) {
            c = type1 === "hypotenuse" ? value1 : value2;
            alpha = type1 === "angle" ? value1 : value2;
            if (!checkAngle(alpha)) { console.log("Кут повинен бути гострим."); return "failed"; }
            let rad = degToRad(alpha);
            a = c * Math.sin(rad);
            b = c * Math.cos(rad);
            beta = 90 - alpha;
        }

        // ----- LEG + ADJACENT ANGLE -----
        else if ((type1 === "leg" && type2 === "adjacent angle") || (type2 === "leg" && type1 === "adjacent angle")) {
            b = type1 === "leg" ? value1 : value2;
            beta = type1 === "adjacent angle" ? value1 : value2;
            if (!checkAngle(beta)) { console.log("Кут повинен бути гострим."); return "failed"; }
            let rad = degToRad(beta);
            a = b * Math.tan(rad);
            c = Math.hypot(a, b);
            alpha = 90 - beta;
        }

        // ----- LEG + OPPOSITE ANGLE -----
        else if ((type1 === "leg" && type2 === "opposite angle") || (type2 === "leg" && type1 === "opposite angle")) {
            a = type1 === "leg" ? value1 : value2;
            alpha = type1 === "opposite angle" ? value1 : value2;
            if (!checkAngle(alpha)) { console.log("Кут повинен бути гострим."); return "failed"; }
            let rad = degToRad(alpha);
            b = a / Math.tan(rad);
            c = Math.hypot(a, b);
            beta = 90 - alpha;
        }

        // ----- HYPOTENUSE + ADJACENT ANGLE -----
        else if ((type1 === "hypotenuse" && type2 === "adjacent angle") || (type2 === "hypotenuse" && type1 === "adjacent angle")) {
            c = type1 === "hypotenuse" ? value1 : value2;
            beta = type1 === "adjacent angle" ? value1 : value2;
            if (!checkAngle(beta)) { console.log("Кут повинен бути гострим."); return "failed"; }
            let rad = degToRad(beta);
            b = c * Math.cos(rad);
            a = Math.sqrt(c*c - b*b);
            alpha = 90 - beta;
        }

        // ----- HYPOTENUSE + OPPOSITE ANGLE -----
        else if ((type1 === "hypotenuse" && type2 === "opposite angle") || (type2 === "hypotenuse" && type1 === "opposite angle")) {
            c = type1 === "hypotenuse" ? value1 : value2;
            alpha = type1 === "opposite angle" ? value1 : value2;
            if (!checkAngle(alpha)) { console.log("Кут повинен бути гострим."); return "failed"; }
            let rad = degToRad(alpha);
            a = c * Math.sin(rad);
            b = Math.sqrt(c*c - a*a);
            beta = 90 - alpha;
        }

        // ----- НЕПІДТРИМУВАНІ КОМБІНАЦІЇ -----
        else {
            console.log("Несумісна пара типів. Перечитайте інструкцію.");
            return "failed";
        }

        // Перевірка на Infinity / NaN
        if (![a,b,c,alpha,beta].every(Number.isFinite)) {
            console.log("Помилка обчислення.");
            return "failed";
        }

        console.log(`a = ${a.toFixed(2)}`);
        console.log(`b = ${b.toFixed(2)}`);
        console.log(`c = ${c.toFixed(2)}`);
        console.log(`alpha = ${alpha.toFixed(2)}°`);
        console.log(`beta = ${beta.toFixed(2)}°`);

        return "success";

    } catch {
        console.log("Помилка виконання.");
        return "failed";
    }
}
