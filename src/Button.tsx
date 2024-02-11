interface ButtonProps{
    count: number;
    handleCount: () => void;
    text: string;
}

export function Button({ count, text, handleCount } : ButtonProps){
    return(
        <>
        <h1>Hello World</h1>
            <button onClick={handleCount}>
                <a href="/" target="_blank">{text}: {count}</a>
            </button>
        </>
    );
}