export default function formatForStringLiteral(str) {
    if(typeof str === 'string'){
        return `"${str}"`;
    }

    return str;
}