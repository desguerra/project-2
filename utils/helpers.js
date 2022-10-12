module.exports = {
    format_age: (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    },
    format_sunsign: (date) => {
        const birthDate = new Date(date);
        const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
        const signs = ["Aquarius ♒🏺", "Pisces ♓🐟", "Aries ♈🐏", "Taurus ♉🐂", "Gemini ♊👬", "Cancer ♋🦀", "Leo ♌🐆", "Virgo ♍👧", "Libra ♎⚖", "Scorpio ♏🦂", "Sagittarius ♐🏹", "Capricorn ♑🐐"];
        let month = birthDate.getMonth();
        let day = birthDate.getDate();
        if (month == 0 && day <= 20) {
            month = 11;
        } else if (day < days[month]) {
            month--;
        };

        return signs[month];
    },
};