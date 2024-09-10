const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    let age = today.getFullYear() - birthYear;

    // Adjust age if birthday hasn't occurred yet this year
    if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) {
        age--;
    }

    return age;
}

export default calculateAge;