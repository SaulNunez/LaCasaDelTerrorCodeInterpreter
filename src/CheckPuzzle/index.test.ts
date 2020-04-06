import { GetStdOutput, CheckSyntaxForConstruct, Check } from './index';

test('Check if conditionals are detected', () => {
    expect(CheckSyntaxForConstruct(Check.CHECK_FOR_BRANCHING,
        `if(true){
            console.log(hey);    
        }
        `)).toBe(true);
});

test('Check if hello world program returns a hello world on alert', () => {
    let code = "window.alert('Hello, world!');";
    expect(GetStdOutput(code)).toBe('Hello, world!');
});

test('Check if alert on multiple elements returns a space between outputs', () => {
    let code = `
                for(var i1 = 1; i1 <= 10; i++){
                    window.alert(i);
                }
                `;

    
    expect(GetStdOutput(code)).toBe('1 2 3 4 5 6 7 8 9 10');
});