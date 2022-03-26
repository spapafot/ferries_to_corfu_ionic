export const getWindDirection = (deg) => {

    let windDirection

    if (deg < 22.5 | deg > 337.5) {
        windDirection = "N"
    } else if (deg >= 22.5 & deg < 67.5) {
        windDirection = "NE"
    } else if (deg >= 67.5 & deg < 112.5) {
        windDirection = "E"
    } else if (deg >= 112.5 & deg < 157.5) {
        windDirection = "SE"
    } else if (deg >= 157.5 & deg < 202.5) {
        windDirection = "S"
    } else if (deg >= 202.5 & deg < 247.5) {
        windDirection = "SW"
    } else if (deg >= 247.5 & deg < 292.5) {
        windDirection = "W"
    } else if (deg >= 292.5 & deg <= 337.5) {
        windDirection = "NW"
    } else {
        windDirection = "NO DATA"
    }
    return windDirection
}


export const getWindSpeed = (windSpeed) => {

    let beaufortScale

    if (windSpeed < 3.4) {
        beaufortScale = 2
    }
    else if (windSpeed < 5.5) {
        beaufortScale = 3
    }
    else if (windSpeed < 8.0) {
        beaufortScale = 4
    }
    else if (windSpeed < 10.8) {
        beaufortScale = 5
    }
    else if (windSpeed < 13.9) {
        beaufortScale = 6
    }
    else if (windSpeed < 17.2) {
        beaufortScale = 7
    }
    else if (windSpeed < 20.8) {
        beaufortScale = 8
    }
    else if (windSpeed < 24.5) {
        beaufortScale = 9
    }
    else if (windSpeed < 28.5) {
        beaufortScale = 10
    }
    else if (windSpeed < 32.7) {
        beaufortScale = 11
    }
    else if (windSpeed >= 32.7) {
        beaufortScale = 12
    } else {
        beaufortScale = "NO DATA"

    }
    return beaufortScale
}


export const windConditions = (shipType, windSpeed, windDirection) => {

    if (shipType === 1) {
        if (windDirection === "S") {
            if (windSpeed >= 5) {
                return "bg-theme_danger_high  text-white"
            } else if (windSpeed >= 4) {
                return "bg-theme_danger_low"
            } else {
                return "bg-theme_light_green"
            }
        } else if (windDirection === "SE") {
            if (windSpeed >= 6) {
                return "bg-theme_danger_high text-white"
            } else if (windSpeed >= 5) {
                return "theme_danger_low "
            } else {
                return "bg-theme_light_green"
            }
        } else if (windDirection === "W" | windDirection === "SW") {
            if (windSpeed >= 3) {  // 7
                return "bg-theme_danger_high text-white"
            } else if (windSpeed >= 2) { // 6
                return "bg-theme_danger_low"
            } else {
                return "bg-theme_light_green"
            }
        } else if (windDirection === "N" | windDirection === "NE" | windDirection === "E" | windDirection === "NW") {
            if (windSpeed >= 3) { // 8
                return "bg-theme_danger_high text-white"
            } else if (windSpeed >= 2) { // 7
                return "bg-theme_danger_low"
            } else {
                return "bg-theme_light_green"
            }
        }


    } else if (shipType === 2) {
        if (windDirection === "S") {
            if (windSpeed >= 7) {
                return "bg-theme_danger_high  text-white"
            } else if (windSpeed >= 6) {
                return "bg-theme_danger_low"
            } else {
                return "bg-theme_light_green"
            }
        } else if (windDirection === "SE" | windDirection === "SW") {
            if (windSpeed >= 8) {
                return "bg-theme_danger_high  text-white"
            } else if (windSpeed >= 7) {
                return "bg-theme_danger_low"
            } else {
                return "bg-theme_light_green"
            }
        } else if (windDirection === "N" | windDirection === "NE" | windDirection === "NW" | windDirection === "E" | windDirection === "W") {
            if (windSpeed >= 7) {
                return "bg-theme_danger_low"
            } else {
                return "bg-theme_light_green"
            }
        }
    }
}
