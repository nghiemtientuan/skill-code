/*
* generate random email
* @return string email
*/
function generateRandomEmail() {
    let email = '';
    const emailLength = 15;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
    let charactersLength = characters.length;
    for (let i = 0; i < emailLength; i++) {
        email += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    email += '@gmail.com';

    return email;
}
  