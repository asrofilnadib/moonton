import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        defaultValue,
        value,
        isError,
        onChange,
        ...props
    },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const controlled = value !== undefined;

    return (
        <input
            {...props}
            type={type}
            className={
                `input-primary ${isError ? 'input-error' : ''} ` + className
            }
            ref={localRef}
            onChange={onChange}
            {...(controlled ? { value } : { defaultValue })}
        />
    );
});
