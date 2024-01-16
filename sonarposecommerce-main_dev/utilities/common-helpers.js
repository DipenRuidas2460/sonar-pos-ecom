import CryptoJS from "crypto-js";

export const stickyHeader = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById('headerSticky');
    if (header !== null) {
        if (number >= 300) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    }
};

export const generateTempArray = (maxItems) => {
    let result = [];

    for (let i = 0; i < maxItems; i++) {
        result.push(i);
    }
    return result;
};

export  const decryptData = async(text) => {
    const data = CryptoJS.AES.decrypt(text, "XkhZG4fW2t2W").toString(CryptoJS.enc.Utf8);
    return data;
};
export const encryptData = (text) => {
    const data = text > 0 ? CryptoJS.AES.encrypt(text.toString(), "XkhZG4fW2t2W").toString() : "";
    return data;
};